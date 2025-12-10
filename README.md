# 🎨 Base NFT Marketplace

A decentralized NFT marketplace built on the **Base blockchain** with React, TypeScript, and Solidity smart contracts. Create, buy, sell, and auction NFTs with built-in royalties and platform fees.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Solidity](https://img.shields.io/badge/Solidity-^0.8.20-363636?logo=solidity)
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)
![Base](https://img.shields.io/badge/Base-Blockchain-0052FF?logo=coinbase)

## ✨ Features

### Smart Contract Features
- **NFT Minting** - Create ERC-721 NFTs with custom metadata and royalties
- **Fixed Price Sales** - List and sell NFTs at a fixed price
- **Auctions** - Create time-limited auctions with bidding functionality
- **Royalties (ERC-2981)** - Automatic royalty payments to original creators
- **Platform Fees** - Configurable marketplace fees
- **Security** - Built with OpenZeppelin contracts and ReentrancyGuard

### Frontend Features
- **Modern UI** - Clean, responsive design with Tailwind CSS
- **Wallet Integration** - Connect with MetaMask and other Web3 wallets via ethers.js
- **Real-time Updates** - React Query for efficient data fetching
- **Smooth Animations** - Framer Motion for polished user experience
- **Type Safety** - Full TypeScript support with Zod validation

## 🏗️ Tech Stack

### Frontend
- **Framework:** React 19 with TypeScript
- **Styling:** Tailwind CSS 4
- **Routing:** Wouter
- **State Management:** React Query (TanStack Query)
- **Animations:** Framer Motion
- **Validation:** Zod

### Smart Contracts
- **Language:** Solidity ^0.8.20
- **Framework:** Hardhat
- **Libraries:** OpenZeppelin Contracts 5.x
- **Standards:** ERC-721, ERC-721Enumerable, ERC-721URIStorage, ERC-2981

### Blockchain
- **Network:** Base (Ethereum L2)
- **Web3 Library:** ethers.js 6

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm
- MetaMask or another Web3 wallet
- Base Sepolia testnet ETH (for testing)

## 📜 Smart Contract Deployment

### Compile Contracts
```bash
npx hardhat compile
```

### Run Tests
```bash
npx hardhat test
```

### Deploy to Base Sepolia
```bash
npx hardhat ignition deploy ./ignition/modules/NFTMarketplace.ts --network base-sepolia
```

### Deploy to Base Mainnet
```bash
npx hardhat ignition deploy ./ignition/modules/NFTMarketplace.ts --network base-mainnet
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start development server |
| `yarn build` | Build for production |
| `yarn test` | Run React tests |
| `npx hardhat compile` | Compile smart contracts |
| `npx hardhat test` | Run contract tests |

## 📋 Smart Contract API

### Core Functions

| Function | Description |
|----------|-------------|
| `mintNFT(address owner, string tokenURI, uint96 royaltyFraction)` | Mint a new NFT |
| `listNFTForSale(uint256 tokenId, uint256 price)` | List NFT for fixed-price sale |
| `buyNFT(uint256 tokenId)` | Purchase a listed NFT |
| `startAuction(uint256 tokenId, uint256 startingBid, uint256 duration)` | Start an auction |
| `placeBid(uint256 tokenId)` | Place a bid on an auction |
| `endAuction(uint256 tokenId)` | End an auction and transfer NFT |

### Events

- `NFTMinted` - Emitted when a new NFT is created
- `NFTListed` - Emitted when an NFT is listed for sale
- `NFTSold` - Emitted when an NFT is purchased
- `AuctionStarted` - Emitted when an auction begins
- `BidPlaced` - Emitted when a bid is placed
- `AuctionEnded` - Emitted when an auction concludes

## 🔐 Security

This project implements several security best practices:

- **ReentrancyGuard** - Protection against reentrancy attacks
- **OpenZeppelin** - Battle-tested contract implementations
- **Pull-over-push** - Safe pattern for ETH transfers
- **Access Control** - Owner-only administrative functions
- **Input Validation** - Comprehensive parameter checks

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) - Smart contract security
- [Base](https://base.org/) - Layer 2 blockchain
- [Hardhat](https://hardhat.org/) - Ethereum development environment
- [React](https://reactjs.org/) - Frontend framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework

---

<p align="center">
  Built with ❤️ for the Base ecosystem
</p>
