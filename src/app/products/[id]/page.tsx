// app/product/[id]/page.tsx
"use client";

import { use } from "react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductTabs } from "@/components/products/ProductTabs";
import ProductCarousel from "@/components/products/ProductCarousel";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { useFeaturedProducts, useProduct } from "@/lib/hooks/use-products";
import { Product } from "@/lib/api/products";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { data: product, isLoading } = useProduct(resolvedParams.id);
  const { data: featuredProducts, isLoading: featuredProductsLoading } =
    useFeaturedProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المنتجات", href: "/products" },
          {
            label: product?.category || "",
            href: `/category/${resolvedParams.id}`,
          },
          { label: product?.name || "", href: "#" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* <ProductGallery images={product?.media || []} /> */}
        <ProductInfo product={product || ({} as Product)} />
      </div>

      <div className="mt-12">
        <ProductTabs product={product || ({} as Product)} />
      </div>

      <div className="mt-16">
        <ProductCarousel
          title="اكتشف منتجات أخرى قد تهمك"
          products={featuredProducts || []}
        />
      </div>
    </div>
  );
}
