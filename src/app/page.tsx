"use client";

import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/products/ProductCarousel";
import { featuredProducts } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      <ProductCarousel
        title="لا تفوت عروض هذا الأسبوع"
        products={featuredProducts}
      />
    </main>
  );
}
