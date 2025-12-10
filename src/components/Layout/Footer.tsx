import React from "react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-dark-card mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link
              href="/"
              className="text-xl font-bold gradient-text font-display"
            >
              BaseNFT
            </Link>
            <p className="mt-4 text-gray-400">
              The premier marketplace for NFTs on the Base network.
            </p>
            <div className="mt-4 flex space-x-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-primary"
              >
                <span className="sr-only">Discord</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium">Marketplace</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/explore"
                  className="text-gray-400 hover:text-white"
                >
                  All NFTs
                </Link>
              </li>
              <li>
                <Link
                  href="/collections"
                  className="text-gray-400 hover:text-white"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-gray-400 hover:text-white"
                >
                  Art
                </Link>
              </li>
              <li>
                <Link
                  href="/explore"
                  className="text-gray-400 hover:text-white"
                >
                  Music
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">My Account</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/profile"
                  className="text-gray-400 hover:text-white"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-gray-400 hover:text-white">
                  Create
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-400 hover:text-white"
                >
                  My Collections
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-gray-400 hover:text-white"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="/help" className="text-gray-400 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/status" className="text-gray-400 hover:text-white">
                  Platform Status
                </a>
              </li>
              <li>
                <a href="/partners" className="text-gray-400 hover:text-white">
                  Partners
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2023 BaseNFT. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="/privacy" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
