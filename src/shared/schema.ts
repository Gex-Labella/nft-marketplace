import { z } from 'zod';

export const insertUserSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email().optional(),
  bio: z.string().max(500).optional(),
  avatar: z.string().url().optional(),
  walletAddress: z.string().optional(),
  password: z.string().min(8).max(100).optional(),
  isVerified: z.boolean().default(false),
  bannerImage: z.string().url().optional(),
});

export const insertCollectionSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(1000).optional(),
  image: z.string().url(),
  bannerImage: z.string().url().optional(),
  creatorId: z.number().int().positive(),
  category: z.string().optional(),
  floorPrice: z.string().optional(),
  totalVolume: z.string().optional(),
  royaltyPercentage: z.number().min(0).max(25).default(10),
  verified: z.boolean().default(false),
});

export const insertNftSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(2000).optional(),
  image: z.string().url(),
  creatorId: z.number().int().positive(),
  ownerId: z.number().int().positive(),
  collectionId: z.number().int().positive().optional(),
  price: z.string().optional(),
  currency: z.string().default("ETH"),
  royaltyPercentage: z.number().min(0).max(25).default(10),
  isAuction: z.boolean().default(false),
  auctionEndTime: z.string().datetime().optional(),
  tokenId: z.string().optional(),
  tokenStandard: z.string().default("ERC-721"),
  blockchain: z.string().default("Base"),
});

export const insertBidSchema = z.object({
  nftId: z.number().int().positive(),
  bidderId: z.number().int().positive(),
  amount: z.string(),
  currency: z.string().default("ETH"),
  expiresAt: z.string().datetime().optional(),
});