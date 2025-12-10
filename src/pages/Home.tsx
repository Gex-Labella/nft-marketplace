import React from "react";
import { Helmet } from "react-helmet";
import HeroSection from "../components/home/HeroSection";

// Placeholder components - you can implement these fully later
const TrendingCollections = () => (
  <section className="py-20">
    <div className="container-custom">
      <h2 className="text-3xl font-bold mb-12">Trending Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card">
            <div className="h-40 bg-gradient-to-r from-gradient-1 to-gradient-2 opacity-60"></div>
            <div className="p-4">
              <h3 className="font-bold">Collection {i}</h3>
              <p className="text-gray-400">10 items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturedNFTs = () => (
  <section className="py-20 bg-dark-lighter">
    <div className="container-custom">
      <h2 className="text-3xl font-bold mb-12">Featured NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="card">
            <div className="h-48 bg-gradient-to-r from-gradient-1 to-gradient-2 opacity-30"></div>
            <div className="p-4">
              <h3 className="font-bold">NFT #{i}</h3>
              <p className="text-gray-400">0.5 ETH</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CreateAndSell = () => (
  <section className="py-20">
    <div className="container-custom">
      <h2 className="text-3xl font-bold mb-12 text-center">
        Create and Sell Your NFTs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gradient-to-r from-gradient-1 to-gradient-2 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-xl font-bold">1</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Set up your wallet</h3>
          <p className="text-gray-400">
            Connect your wallet to get started with BaseNFT.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gradient-to-r from-gradient-1 to-gradient-2 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-xl font-bold">2</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Create your collection</h3>
          <p className="text-gray-400">
            Upload your work and set up your collection.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-gradient-to-r from-gradient-1 to-gradient-2 rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-xl font-bold">3</span>
          </div>
          <h3 className="text-xl font-bold mb-2">List them for sale</h3>
          <p className="text-gray-400">
            Choose between auctions and fixed-price listings.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const TopCreators = () => (
  <section className="py-20 bg-dark-lighter">
    <div className="container-custom">
      <h2 className="text-3xl font-bold mb-12">Top Creators</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card p-4 flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-gradient-1 to-gradient-2 rounded-full mr-4"></div>
            <div>
              <h3 className="font-bold">Creator {i}</h3>
              <p className="text-gray-400">24 items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <>
      <Helmet>
        <title>BaseNFT - NFT Marketplace on Base</title>
        <meta
          name="description"
          content="Discover, collect, and sell extraordinary NFTs on the Base network. The premier marketplace for NFTs on Base."
        />
      </Helmet>

      <HeroSection />
      <TrendingCollections />
      <FeaturedNFTs />
      <CreateAndSell />
      <TopCreators />
    </>
  );
}
