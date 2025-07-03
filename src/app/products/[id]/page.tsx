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
import Loader from "@/app/loading";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const { data: product, isLoading } = useProduct(resolvedParams.id);
  const { data: featuredProducts, isLoading: featuredProductsLoading } =
    useFeaturedProducts();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المنتجات", href: "/products" },
          {
            label: product?.category?.arabicName || "",
            href: `/products?categoryIds=${product?.category?.id}`,
          },
          { label: product?.arabicName || "" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <ProductGallery
          images={product?.media || []}
          discount={product?.discount || "0"}
          product={product || ({} as Product)}
        />
        <ProductInfo product={product || ({} as Product)} />
      </div>

      <div className="mt-12">
        <ProductTabs product={product || ({} as Product)} />
      </div>

      <div className="mt-16">
        <ProductCarousel
          title="اكتشف منتجات أخرى قد تهمك"
          products={featuredProducts?.products || []}
          isLoading={featuredProductsLoading}
        />
      </div>
    </>
  );
}
