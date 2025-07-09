// app/product/[id]/page.tsx
"use client";

import { use } from "react";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductTabs } from "@/components/products/ProductTabs";
import ProductCarousel from "@/components/products/ProductCarousel";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { useFeaturedProducts, useProduct } from "@/lib/hooks/use-products";
import Loader from "@/app/loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  console.log(`ProductPage rendering for ID: ${productId}`);

  const { data: product, isLoading, isError, error } = useProduct(productId);
  const { data: featuredProducts, isLoading: featuredProductsLoading } =
    useFeaturedProducts();

  // Log the current state
  console.log(`Product page state:`, {
    productId,
    isLoading,
    isError,
    hasProduct: !!product,
    error: error?.message,
  });

  useEffect(() => {
    if (isError) {
      console.error(`Product page error, will redirect in 5 seconds:`, error);
      // Delay redirect to see the error
      const timer = setTimeout(() => {
        router.push("/products");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isError, router, error]);

  if (isLoading) {
    console.log(`Product page loading...`);
    return <Loader />;
  }

  if (isError) {
    console.error(`Product page showing error state:`, error);
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-red-600">
            خطأ في تحميل المنتج
          </h2>
          <p className="text-gray-600">معرف المنتج: {productId}</p>
          <p className="text-sm text-gray-500">
            {error?.message || "حدث خطأ غير متوقع"}
          </p>
          <p className="text-xs text-gray-400">
            سيتم توجيهك لصفحة المنتجات خلال 5 ثوانِ...
          </p>
          <button
            onClick={() => router.push("/products")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            العودة للمنتجات الآن
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    console.log(`No product data available`);
    return <Loader />;
  }

  console.log(
    `Product page rendering successfully with product:`,
    product.arabicName
  );

  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المنتجات", href: "/products" },
          {
            label: product.category?.arabicName || "",
            href: `/products?categoryIds=${product.category?.id}`,
          },
          { label: product.arabicName || "" },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <ProductGallery
          images={product.media || []}
          discount={product.discount || "0"}
          product={product}
        />
        <ProductInfo product={product} />
      </div>

      <div className="mt-12">
        <ProductTabs product={product} />
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
