"use client";

import HeroSection from "@/components/HeroSection";
import ProductCarousel from "@/components/products/ProductCarousel";
import { useProducts } from "@/lib/hooks/use-products";

export default function HomePage() {
  const { data: products, isLoading } = useProducts();

  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      <ProductCarousel
        title="لا تفوت عروض هذا الأسبوع"
        products={products || []}
        isLoading={isLoading}
      />
    </main>
  );
}
