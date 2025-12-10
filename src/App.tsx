import React from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import Home from "./pages/Home";

// Placeholder components for routes
function Explore() {
  return <div className="container-custom py-20">Explore Page</div>;
}

function Collections() {
  return <div className="container-custom py-20">Collections Page</div>;
}

function CollectionDetail() {
  return <div className="container-custom py-20">Collection Detail Page</div>;
}

function NftDetail() {
  return <div className="container-custom py-20">NFT Detail Page</div>;
}

function Create() {
  return <div className="container-custom py-20">Create Page</div>;
}

function Profile() {
  return <div className="container-custom py-20">Profile Page</div>;
}

function NotFound() {
  return <div className="container-custom py-20">404 - Page Not Found</div>;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/explore" component={Explore} />
      <Route path="/collections" component={Collections} />
      <Route path="/collection/:id" component={CollectionDetail} />
      <Route path="/nft/:id" component={NftDetail} />
      <Route path="/create" component={Create} />
      <Route path="/profile/:id?" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen flex flex-col bg-dark">
          <Header />
          <main className="flex-grow pt-16">
            <Router />
          </main>
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
