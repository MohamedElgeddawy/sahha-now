// app/product/[id]/page.tsx
"use client";

import { use } from "react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductTabs } from "@/components/products/ProductTabs";
import ProductCarousel from "@/components/products/ProductCarousel";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { featuredProducts } from "@/lib/mock-data";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  // For now, we'll use the mock data directly
  const product = featuredProducts.find((p) => p.id === resolvedParams.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Get related products (excluding current product)
  const relatedProducts = featuredProducts
    .filter(
      (p) => p.category === product.category && p.id !== resolvedParams.id
    )
    .slice(0, 8); // Show up to 8 related products for carousel

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المنتجات", href: "/products" },
          { label: product.category, href: `/category/${resolvedParams.id}` },
          { label: product.arabicTitle, href: "#" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <ProductGallery images={product.images} />
        <ProductInfo product={product} />
      </div>

      <div className="mt-12">
        <ProductTabs product={product} />
      </div>

      <div className="mt-16">
        <ProductCarousel
          title="لا تفوت عروض هذا الأسبوع"
          products={featuredProducts}
        />
      </div>
    </div>
  );
}
