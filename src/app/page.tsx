"use client";

import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/products/ProductCarousel";
import BrandCarousel from "@/components/products/BrandCarousel";
import Announcements from "@/components/Announcements";
import { useOfferProducts } from "@/lib/hooks/use-products";
import CategorizedProductTabs from "@/components/products/CategorizedProductTabs";

export default function HomePage() {
  const { data: products, isLoading } = useOfferProducts();

  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />

      <ProductCarousel
        title="لا تفوت عروض هذا الأسبوع"
        products={products || []}
        isLoading={isLoading}
      />
      <div className="py-2 sm:py-4">
        <Announcements />
      </div>
      <BrandCarousel />
      <div className="px-2 sm:px-4">
        <CategorizedProductTabs />
      </div>
    </main>
  );
}
