import React from "react";
import { Link } from "wouter";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="py-20 md:py-32">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-display leading-tight">
              Discover, collect, and sell{" "}
              <span className="gradient-text">extraordinary NFTs</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              The premier marketplace for NFTs on the Base network. Buy, sell,
              and discover exclusive digital items.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/explore">
                <Button size="lg">Explore</Button>
              </Link>
              <Link href="/create">
                <Button variant="outline" size="lg">
                  Create
                </Button>
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6">
              <div>
                <p className="font-bold text-3xl">35k+</p>
                <p className="text-gray-400">Artworks</p>
              </div>
              <div>
                <p className="font-bold text-3xl">18k+</p>
                <p className="text-gray-400">Artists</p>
              </div>
              <div>
                <p className="font-bold text-3xl">25k+</p>
                <p className="text-gray-400">Auctions</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-gradient-to-r from-gradient-1 to-gradient-2 rounded-2xl p-1">
              <div className="bg-dark-card rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Featured NFT"
                  className="w-full"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">
                        Ethereal Landscape #1
                      </h3>
                      <p className="text-gray-400">By @johndoe</p>
                    </div>
                    <div className="bg-dark rounded-lg px-4 py-2">
                      <p className="text-sm text-gray-400">Current Bid</p>
                      <p className="font-bold">1.5 ETH</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 w-64 h-64 bg-gradient-1 blur-[120px] opacity-30 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
