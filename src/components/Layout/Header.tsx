import React, { useState } from "react";
import { Link } from "wouter";
import { Button } from "../ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-dark-card fixed w-full z-10 shadow-lg">
      <div className="container-custom py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold gradient-text font-display">
          BaseNFT
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="text-white hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/explore"
            className="text-white hover:text-primary transition-colors"
          >
            Explore
          </Link>
          <Link
            href="/collections"
            className="text-white hover:text-primary transition-colors"
          >
            Collections
          </Link>
          <Link
            href="/create"
            className="text-white hover:text-primary transition-colors"
          >
            Create
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link href="/profile">
            <Button variant="outline">Connect Wallet</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-card p-4">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              href="/collections"
              className="text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/create"
              className="text-white hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Create
            </Link>
            <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" fullWidth>
                Connect Wallet
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
