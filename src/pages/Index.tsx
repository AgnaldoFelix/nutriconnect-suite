import React from "react";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

const Index: React.FC = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Footer />
    </main>
  );
};

export default Index;
