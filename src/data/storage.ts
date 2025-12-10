import { insertUserSchema, insertCollectionSchema, insertNftSchema, insertBidSchema } from "../shared/schema";
import { z } from 'zod';


// Types
type User = z.infer<typeof insertUserSchema> & { 
  id: number, 
  createdAt: string,
  updatedAt: string
};

type Collection = z.infer<typeof insertCollectionSchema> & { 
  id: number, 
  createdAt: string,
  updatedAt: string,
  itemsCount: number
};

type NFT = z.infer<typeof insertNftSchema> & { 
  id: number, 
  createdAt: string,
  updatedAt: string,
  likes: number,
  views: number,
  featured: boolean
};

type Bid = z.infer<typeof insertBidSchema> & { 
  id: number, 
  createdAt: string,
  bidder?: User
};

// Mock data
const mockUsers: User[] = [
  {
    id: 1,
    username: "johndoe",
    email: "john@example.com",
    bio: "Digital artist and NFT creator",
    avatar: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    walletAddress: "0x1234...5678",
    password: "password123",
    isVerified: true,
    bannerImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    username: "janesmith",
    email: "jane@example.com",
    bio: "Crypto artist specializing in abstract digital art",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    walletAddress: "0x9876...4321",
    password: "password456",
    isVerified: true,
    bannerImage: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const mockCollections: Collection[] = [
  {
    id: 1,
    name: "Abstract Dimensions",
    description: "A collection of abstract 3D artworks exploring dimensions and space.",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    bannerImage: "https://images.unsplash.com/photo-1549490349-8643362247b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    creatorId: 1,
    category: "Abstract",
    floorPrice: "0.5",
    totalVolume: "120.5",
    royaltyPercentage: 10,
    verified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    itemsCount: 12
  },
  {
    id: 2,
    name: "Neon Future",
    description: "Cyberpunk-inspired digital art with neon aesthetics.",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    bannerImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    creatorId: 2,
    category: "Cyberpunk",
    floorPrice: "0.8",
    totalVolume: "65.2",
    royaltyPercentage: 7.5,
    verified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    itemsCount: 8
  }
];

const mockNFTs: NFT[] = [
  {
    id: 1,
    name: "Ethereal Landscape #1",
    description: "A surreal digital landscape with floating islands and cosmic elements.",
    image: "https://images.unsplash.com/photo-1533158388470-9a56699990c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    creatorId: 1,
    ownerId: 1,
    collectionId: 1,
    price: "1.5",
    currency: "ETH",
    royaltyPercentage: 10,
    isAuction: false,
    tokenId: "1001",
    tokenStandard: "ERC-721",
    blockchain: "Base",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likes: 42,
    views: 156,
    featured: true
  },
  {
    id: 2,
    name: "Neon City Dreams",
    description: "A futuristic cityscape bathed in neon lights.",
    image: "https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    creatorId: 2,
    ownerId: 1,
    collectionId: 2,
    price: "2.3",
    currency: "ETH",
    royaltyPercentage: 7.5,
    isAuction: true,
    auctionEndTime: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
    tokenId: "2001",
    tokenStandard: "ERC-721",
    blockchain: "Base",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likes: 78,
    views: 213,
    featured: true
  }
];

const mockBids: Bid[] = [
  {
    id: 1,
    nftId: 2,
    bidderId: 1,
    amount: "2.1",
    currency: "ETH",
    createdAt: new Date().toISOString()
  }
];

// Mock storage implementation
class MockStorage {
  // User methods
  async getUser(id: number): Promise<User | null> {
    const user = mockUsers.find(u => u.id === id);
    return user || null;
  }
  
  async getUserByUsername(username: string): Promise<User | null> {
    const user = mockUsers.find(u => u.username === username);
    return user || null;
  }
  
  async getUserByWalletAddress(address: string): Promise<User | null> {
    const user = mockUsers.find(u => u.walletAddress === address);
    return user || null;
  }
  
  async createUser(userData: z.infer<typeof insertUserSchema>): Promise<User> {
    const newUser: User = {
      ...userData,
      id: mockUsers.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockUsers.push(newUser);
    return newUser;
  }
  
  async updateUser(id: number, userData: Partial<z.infer<typeof insertUserSchema>>): Promise<User | null> {
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    mockUsers[index] = {
      ...mockUsers[index],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    return mockUsers[index];
  }
  
  // Collection methods
  async getAllCollections(limit?: number, offset?: number): Promise<Collection[]> {
    let collections = [...mockCollections];
    if (offset) collections = collections.slice(offset);
    if (limit) collections = collections.slice(0, limit);
    return collections;
  }
  
  async getTrendingCollections(limit?: number): Promise<Collection[]> {
    // For demo, just sort by floor price and return
    const collections = [...mockCollections]
      .sort((a, b) => parseFloat(b.floorPrice || "0") - parseFloat(a.floorPrice || "0"))
      .slice(0, limit || 4);
    return collections;
  }
  
  async getCollection(id: number): Promise<Collection | null> {
    const collection = mockCollections.find(c => c.id === id);
    return collection || null;
  }
  
  async getCollectionsByCreator(creatorId: number): Promise<Collection[]> {
    return mockCollections.filter(c => c.creatorId === creatorId);
  }
  
  async createCollection(collectionData: z.infer<typeof insertCollectionSchema>): Promise<Collection> {
    const newCollection: Collection = {
      ...collectionData,
      id: mockCollections.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      itemsCount: 0
    };
    mockCollections.push(newCollection);
    return newCollection;
  }
  
  async updateCollection(id: number, collectionData: Partial<z.infer<typeof insertCollectionSchema>>): Promise<Collection | null> {
    const index = mockCollections.findIndex(c => c.id === id);
    if (index === -1) return null;
    
    mockCollections[index] = {
      ...mockCollections[index],
      ...collectionData,
      updatedAt: new Date().toISOString()
    };
    
    return mockCollections[index];
  }
  
  // NFT methods
  async getAllNFTs(limit?: number, offset?: number, filter?: any): Promise<NFT[]> {
    let nfts = [...mockNFTs];
    
    // Apply filters
    if (filter) {
      if (filter.collection) {
        nfts = nfts.filter(nft => nft.collectionId === filter.collection);
      }
      if (filter.minPrice) {
        nfts = nfts.filter(nft => parseFloat(nft.price || "0") >= filter.minPrice);
      }
      if (filter.maxPrice) {
        nfts = nfts.filter(nft => parseFloat(nft.price || "0") <= filter.maxPrice);
      }
    }
    
    if (offset) nfts = nfts.slice(offset);
    if (limit) nfts = nfts.slice(0, limit);
    
    return nfts;
  }
  
  async getFeaturedNFTs(limit?: number): Promise<NFT[]> {
    return mockNFTs
      .filter(nft => nft.featured)
      .slice(0, limit || 8);
  }
  
  async getNFT(id: number): Promise<NFT | null> {
    const nft = mockNFTs.find(n => n.id === id);
    return nft || null;
  }
  
  async getNFTsByCollection(collectionId: number): Promise<NFT[]> {
    return mockNFTs.filter(n => n.collectionId === collectionId);
  }
  
  async getNFTsByCreator(creatorId: number): Promise<NFT[]> {
    return mockNFTs.filter(n => n.creatorId === creatorId);
  }
  
  async getNFTsByOwner(ownerId: number): Promise<NFT[]> {
    return mockNFTs.filter(n => n.ownerId === ownerId);
  }
  
  async createNFT(nftData: z.infer<typeof insertNftSchema>): Promise<NFT> {
    const newNFT: NFT = {
      ...nftData,
      id: mockNFTs.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      views: 0,
      featured: false
    };
    mockNFTs.push(newNFT);
    return newNFT;
  }
  
  async updateNFT(id: number, nftData: Partial<z.infer<typeof insertNftSchema>>): Promise<NFT | null> {
    const index = mockNFTs.findIndex(n => n.id === id);
    if (index === -1) return null;
    
    mockNFTs[index] = {
      ...mockNFTs[index],
      ...nftData,
      updatedAt: new Date().toISOString()
    };
    
    return mockNFTs[index];
  }
  
  // Bid methods
  async getBidsByNFT(nftId: number): Promise<Bid[]> {
    return mockBids
      .filter(b => b.nftId === nftId)
      .map(bid => {
        const bidder = mockUsers.find(u => u.id === bid.bidderId);
        return {
          ...bid,
          bidder: bidder ? {
            ...bidder,
            password: undefined // Don't expose password
          } : undefined
        };
      });
  }
  
  async getBidsByBidder(bidderId: number): Promise<Bid[]> {
    return mockBids.filter(b => b.bidderId === bidderId);
  }
  
  async createBid(bidData: z.infer<typeof insertBidSchema>): Promise<Bid> {
    const newBid: Bid = {
      ...bidData,
      id: mockBids.length + 1,
      createdAt: new Date().toISOString()
    };
    mockBids.push(newBid);
    return newBid;
  }
}

export const storage = new MockStorage();