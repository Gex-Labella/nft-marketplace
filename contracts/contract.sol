// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title BaseNFTMarketplace
 * @dev A smart contract for minting, selling, and auctioning NFTs on Base.
 * Implements ERC721, ERC721Enumerable, ERC721URIStorage, ERC2981.
 */
contract BaseNFTMarketplace is ERC721Enumerable, ERC721URIStorage, ERC2981, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // --- Platform Fee ---
    address payable public platformFeeRecipient;
    uint96 public platformFeePercent; // Basis points, e.g., 250 for 2.5% (250/10000)

    // --- Listings for Fixed Price Sales ---
    struct Listing {
        uint256 price;
        address seller;
    }
    mapping(uint256 => Listing) public listings; // tokenId => Listing

    // --- Auctions ---
    struct Auction {
        address seller;
        uint256 startingBid;
        uint256 highestBid;
        address highestBidder;
        uint256 endTime;
        bool active; // True if auction is ongoing
        bool ended;  // True if auction has concluded (either by time or manual end)
    }
    mapping(uint256 => Auction) public auctions; // tokenId => Auction

    // Tracks ETH escrowed by bidders for active auctions
    // This is crucial for the pull-over-push pattern for refunds.
    mapping(uint256 => mapping(address => uint256)) public userAuctionEscrow; // tokenId => bidder => amountEscrowed

    // --- Events ---
    event NFTMinted(
        uint256 indexed tokenId,
        address indexed creator, // The msg.sender who initiated minting, also royalty recipient
        address indexed owner,   // The initial owner of the NFT
        string tokenURI,
        uint96 royaltyFraction  // Royalty fraction in basis points
    );
    event NFTListed(uint256 indexed tokenId, uint256 price, address indexed seller);
    event NFTUnlisted(uint256 indexed tokenId);
    event NFTSold(uint256 indexed tokenId, uint256 price, address indexed seller, address indexed buyer, uint256 platformFee, uint256 royaltyAmount);

    event AuctionStarted(uint256 indexed tokenId, address indexed seller, uint256 startingBid, uint256 endTime);
    event BidPlaced(uint256 indexed tokenId, address indexed bidder, uint256 amount);
    event AuctionEnded(uint256 indexed tokenId, address indexed winner, uint256 winningBid, uint256 platformFee, uint256 royaltyAmount);
    event BidWithdrawn(uint256 indexed tokenId, address indexed bidder, uint256 amount); // For outbid or unsuccessful bidders

    // --- Errors ---
    error NotOwnerOrApproved();
    error PriceMustBePositive();
    error AlreadyListed();
    error NotListed();
    error NotSeller();
    error InsufficientPayment();
    error AuctionAlreadyActive();
    error AuctionNotActive();
    error AuctionAlreadyEnded();
    error AuctionNotYetEnded();
    error AuctionDurationTooShort();
    error BidTooLow();
    error BidBelowStartingPrice();
    error SellerCannotBid();
    error HighestBidderCannotWithdrawDuringAuction();
    error WinnerFundsUsedForPurchase();
    error NoFundsToWithdraw();
    error TransferToZeroAddress();
    error FeePercentTooHigh();
    error NFTInAuction();
    error NFTListedForSale();

    // --- Constructor ---
    constructor(
        string memory name,         // NFT Collection Name (e.g., "BaseNFT")
        string memory symbol,       // NFT Collection Symbol (e.g., "BNFT")
        address initialOwner,       // Owner of the contract (for Ownable functions)
        address payable _platformFeeRecipient,
        uint96 _platformFeePercent  // e.g., 250 for 2.5%
    ) ERC721(name, symbol) Ownable(initialOwner) {
        if (_platformFeeRecipient == address(0)) revert TransferToZeroAddress();
        if (_platformFeePercent > 10000) revert FeePercentTooHigh(); // Max 100%

        platformFeeRecipient = _platformFeeRecipient;
        platformFeePercent = _platformFeePercent;
    }

    // --- NFT Minting ---
    /**
     * @dev Mints a new NFT and sets its royalty information.
     * @param owner The address to receive the minted NFT.
     * @param tokenURI_ The URI for the NFT's metadata (JSON).
     * @param royaltyFraction_ The royalty percentage in basis points (e.g., 500 for 5%).
     */
    function mintNFT(address owner, string memory tokenURI_, uint96 royaltyFraction_)
        public
        returns (uint256)
    {
        if (owner == address(0)) revert TransferToZeroAddress();
        _tokenIdCounter.increment();
        uint256 newTokenId = _tokenIdCounter.current();

        _safeMint(owner, newTokenId);
        _setTokenURI(newTokenId, tokenURI_);
        // The creator (msg.sender) is set as the royalty recipient.
        _setTokenRoyalty(newTokenId, msg.sender, royaltyFraction_);

        emit NFTMinted(newTokenId, msg.sender, owner, tokenURI_, royaltyFraction_);
        return newTokenId;
    }

    // --- Fixed Price Sales ---
    function listNFTForSale(uint256 tokenId, uint256 price) public nonReentrant {
        if (!_isApprovedOrOwner(msg.sender, tokenId)) revert NotOwnerOrApproved();
        if (price == 0) revert PriceMustBePositive();
        if (listings[tokenId].seller != address(0)) revert AlreadyListed();
        if (auctions[tokenId].active) revert NFTInAuction();

        listings[tokenId] = Listing(price, msg.sender);
        emit NFTListed(tokenId, price, msg.sender);
    }

    function unlistNFT(uint256 tokenId) public nonReentrant {
        Listing storage listing = listings[tokenId];
        if (listing.seller != msg.sender) revert NotSeller();
        if (listing.seller == address(0)) revert NotListed(); // Check if it was ever listed

        delete listings[tokenId];
        emit NFTUnlisted(tokenId);
    }

    function buyNFT(uint256 tokenId) public payable nonReentrant {
        Listing storage listing = listings[tokenId];
        if (listing.seller == address(0)) revert NotListed();
        if (msg.value < listing.price) revert InsufficientPayment();
        if (auctions[tokenId].active) revert NFTInAuction(); // Should not happen if listed

        address seller = listing.seller;
        uint256 price = listing.price;

        delete listings[tokenId]; // Clear listing before transfers

        // Calculate fees and royalties
        (address royaltyRecipient, uint256 royaltyAmount) = royaltyInfo(tokenId, price);
        uint256 actualPlatformFeePercent = platformFeePercent; // Use stored value
        uint256 calculatedPlatformFee = (price * actualPlatformFeePercent) / 10000;
        
        uint256 totalDeductions = royaltyAmount + calculatedPlatformFee;
        if (totalDeductions > price) { // Safety check, should not happen with proper royalty/fee settings
            // Handle this case: perhaps platform fee is reduced, or revert.
            // For now, assume royalty + platform fee <= price.
            // If it can be > price, royalty should take precedence or a clear rule defined.
            // Let's assume royalties are capped or platform fee is adjusted.
            // Simplest is to ensure royalty + fee <= 100%.
            // If royalty is very high, platform fee might become 0 or negative.
            if (royaltyAmount >= price) {
                 calculatedPlatformFee = 0; // No platform fee if royalty covers everything
                 sellerProceeds = 0;
            } else if (totalDeductions > price) {
                calculatedPlatformFee = price - royaltyAmount; // Platform fee gets the remainder
                sellerProceeds = 0;
            }
        }
        uint256 sellerProceeds = price - royaltyAmount - calculatedPlatformFee;


        // Transfer NFT
        _transfer(seller, msg.sender, tokenId);

        // Distribute funds
        if (calculatedPlatformFee > 0 && platformFeeRecipient != address(0)) {
            payable(platformFeeRecipient).transfer(calculatedPlatformFee);
        }
        if (royaltyAmount > 0 && royaltyRecipient != address(0)) {
            payable(royaltyRecipient).transfer(royaltyAmount);
        }
        if (sellerProceeds > 0) { // Seller might get 0 if fees/royalties are 100%
             payable(seller).transfer(sellerProceeds);
        }


        // Refund overpayment
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }

        emit NFTSold(tokenId, price, seller, msg.sender, calculatedPlatformFee, royaltyAmount);
    }

    // --- Auctions ---
    function startAuction(uint256 tokenId, uint256 _startingBid, uint256 durationSeconds) public nonReentrant {
        if (!_isApprovedOrOwner(msg.sender, tokenId)) revert NotOwnerOrApproved();
        if (listings[tokenId].seller != address(0)) revert NFTListedForSale();
        if (auctions[tokenId].active) revert AuctionAlreadyActive();
        if (durationSeconds < 60) revert AuctionDurationTooShort(); // Min 1 minute auction

        auctions[tokenId] = Auction({
            seller: msg.sender,
            startingBid: _startingBid,
            highestBid: 0, // Set by first valid bid
            highestBidder: address(0),
            endTime: block.timestamp + durationSeconds,
            active: true,
            ended: false
        });

        // Transfer NFT to the contract to hold during auction
        _transfer(msg.sender, address(this), tokenId);

        emit AuctionStarted(tokenId, msg.sender, _startingBid, auctions[tokenId].endTime);
    }

    function placeBid(uint256 tokenId) public payable nonReentrant {
        Auction storage auction = auctions[tokenId];
        if (!auction.active) revert AuctionNotActive();
        if (auction.ended) revert AuctionAlreadyEnded();
        if (block.timestamp >= auction.endTime) revert AuctionNotYetEnded(); // Using >= as endTime is exclusive
        if (msg.sender == auction.seller) revert SellerCannotBid();
        
        uint256 currentHighestBid = auction.highestBid;
        if (msg.value <= currentHighestBid) revert BidTooLow();
        if (currentHighestBid == 0 && msg.value < auction.startingBid) revert BidBelowStartingPrice(); // First bid must meet starting

        // The msg.value is the new bid. Previous highest bidder's funds remain in their escrow.
        // If this bidder had a previous (lower) active bid for THIS auction, refund it now.
        // This ensures a bidder only has one active bid amount escrowed per auction.
        if (userAuctionEscrow[tokenId][msg.sender] > 0) {
            payable(msg.sender).transfer(userAuctionEscrow[tokenId][msg.sender]);
        }
        
        userAuctionEscrow[tokenId][msg.sender] = msg.value; // Escrow the new bid amount

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;

        emit BidPlaced(tokenId, msg.sender, msg.value);
    }

    function withdrawOutbidFunds(uint256 tokenId) public nonReentrant {
        Auction storage auction = auctions[tokenId];
        // Can withdraw if:
        // 1. Auction is active, and user is NOT the current highest bidder.
        // 2. Auction has ended, and user was NOT the winner.
        
        uint256 amountToWithdraw = userAuctionEscrow[tokenId][msg.sender];
        if (amountToWithdraw == 0) revert NoFundsToWithdraw();

        if (auction.active && !auction.ended) { // Auction ongoing
            if (msg.sender == auction.highestBidder) revert HighestBidderCannotWithdrawDuringAuction();
        } else if (auction.ended) { // Auction concluded
            if (msg.sender == auction.highestBidder && auction.highestBid > 0) {
                 // This check is for the winner. Winner's funds are used.
                 // If auction ended with no winner (highestBidder is address(0) or highestBid is 0),
                 // then even the "highestBidder" (if any) should be able to withdraw.
                 // However, if there was a winner, their funds are used.
                 revert WinnerFundsUsedForPurchase();
            }
        } else {
            // Should not reach here if auction is neither active nor ended, but safety check.
            revert AuctionNotActive(); // Or some other appropriate error
        }
        
        userAuctionEscrow[tokenId][msg.sender] = 0; // Clear escrow for this user
        payable(msg.sender).transfer(amountToWithdraw);

        emit BidWithdrawn(tokenId, msg.sender, amountToWithdraw);
    }

    function endAuction(uint256 tokenId) public nonReentrant {
        Auction storage auction = auctions[tokenId];
        if (!auction.active) revert AuctionNotActive();
        if (auction.ended) revert AuctionAlreadyEnded();
        if (block.timestamp < auction.endTime) revert AuctionNotYetEnded();

        auction.ended = true;
        auction.active = false; // Mark as inactive

        address seller = auction.seller;
        address winner = auction.highestBidder;
        uint256 winningBid = auction.highestBid;

        uint256 calculatedPlatformFee = 0;
        uint256 royaltyAmount = 0;

        if (winner == address(0) || winningBid == 0) { // No valid bids, or auction failed
            // Return NFT to seller
            _safeTransfer(address(this), seller, tokenId, "");
            emit AuctionEnded(tokenId, address(0), 0, 0, 0);
        } else {
            // Winner's funds are in userAuctionEscrow[tokenId][winner] == winningBid
            
            (address royaltyRecipient, uint256 _royaltyAmount) = royaltyInfo(tokenId, winningBid);
            royaltyAmount = _royaltyAmount;
            uint256 actualPlatformFeePercent = platformFeePercent;
            calculatedPlatformFee = (winningBid * actualPlatformFeePercent) / 10000;

            uint256 totalDeductions = royaltyAmount + calculatedPlatformFee;
            if (totalDeductions > winningBid) {
                 if (royaltyAmount >= winningBid) {
                     calculatedPlatformFee = 0;
                 } else {
                    calculatedPlatformFee = winningBid - royaltyAmount;
                 }
            }
            uint256 sellerProceeds = winningBid - royaltyAmount - calculatedPlatformFee;

            // Transfer NFT to winner
            _safeTransfer(address(this), winner, tokenId, "");

            // Distribute funds from winner's escrow
            if (calculatedPlatformFee > 0 && platformFeeRecipient != address(0)) {
                payable(platformFeeRecipient).transfer(calculatedPlatformFee);
            }
            if (royaltyAmount > 0 && royaltyRecipient != address(0)) {
                payable(royaltyRecipient).transfer(royaltyAmount);
            }
            if (sellerProceeds > 0) { // Seller might get 0
                payable(seller).transfer(sellerProceeds);
            }
            
            // Clear winner's escrow as it's now used
            userAuctionEscrow[tokenId][winner] = 0;

            emit AuctionEnded(tokenId, winner, winningBid, calculatedPlatformFee, royaltyAmount);
        }
        // Other bidders can now call withdrawOutbidFunds for their escrowed amounts.
    }

    // --- Admin functions ---
    function setPlatformFeeRecipient(address payable _newRecipient) public onlyOwner {
        if (_newRecipient == address(0)) revert TransferToZeroAddress();
        platformFeeRecipient = _newRecipient;
    }

    function setPlatformFeePercent(uint96 _newPercent) public onlyOwner {
        if (_newPercent > 10000) revert FeePercentTooHigh(); // Max 100%
        platformFeePercent = _newPercent;
    }

    function withdrawContractBalance() public onlyOwner {
        // Allows owner to withdraw any ETH accidentally sent to the contract
        // or accumulated if there's a flaw (should not happen with pull-over-push).
        uint256 balance = address(this).balance;
        if (balance > 0) {
            payable(owner()).transfer(balance);
        }
    }

    // --- ERC721 Overrides & ERC2981 Support ---
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        // Ensure NFT is not listed or in auction before burning
        if (listings[tokenId].seller != address(0)) revert AlreadyListed();
        if (auctions[tokenId].active) revert AuctionAlreadyActive();
        super._burn(tokenId);
        // Clear royalty info if it exists
        _deleteDefaultRoyalty(); // Or specific token royalty if set per token
    }

    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage) returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721Enumerable, ERC721URIStorage, ERC2981) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
    
    function _increaseBalance(address account, uint128 value) internal virtual override(ERC721Enumerable, ERC721) {
        super._increaseBalance(account, value);
    }

    // Helper to check ownership or approval
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        if (!_exists(tokenId)) return false; // Cannot be owner/approved for non-existent token
        address tokenOwner = ownerOf(tokenId);
        return (spender == tokenOwner || getApproved(tokenId) == spender || isApprovedForAll(tokenOwner, spender));
    }

    // Fallback functions to receive Ether (though direct sends are discouraged)
    receive() external payable {}
    fallback() external payable {}
}