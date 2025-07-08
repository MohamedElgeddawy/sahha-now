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

  const typedProduct = product as unknown as Product;

  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المنتجات", href: "/products" },
          {
            label: typedProduct?.category?.arabicName || "",
            href: `/products?categoryIds=${typedProduct?.category?.id}`,
          },
          { label: typedProduct?.arabicName || "" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <ProductGallery
          images={typedProduct?.media || []}
          discount={typedProduct?.discount || "0"}
          product={typedProduct || ({} as Product)}
        />
        <ProductInfo product={typedProduct || ({} as Product)} />
      </div>

      <div className="mt-12">
        <ProductTabs product={typedProduct || ({} as Product)} />
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
