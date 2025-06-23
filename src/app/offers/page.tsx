"use client";

import { Button } from "@/components/ui/button";
import { useOfferProducts } from "@/lib/hooks/use-products";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { useIntersectionObserver } from "usehooks-ts";
import ProductCardGrid, {
  ProductCardGridSkeleton,
} from "@/components/products/ProductCardGrid";

export default function OffersPage() {
  const {
    data: offerProducts,
    isLoading: offersLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useOfferProducts();

  const intersection = useIntersectionObserver();

  // Fetch next page when the load more element is visible
  useEffect(() => {
    if (intersection?.isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [
    intersection?.isIntersecting,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  ]);

  const hasOffers = useMemo(
    () =>
      offerProducts?.pages.flatMap((page) => page.products).length &&
      offerProducts?.pages.flatMap((page) => page.products).length > 0,
    [offerProducts]
  );

  return (
    <div className="py-10">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "العروض", href: "/offers" },
        ]}
      />

      <h1 className="text-3xl font-bold mb-6 text-gray-800 rtl:text-right">
        لا تفوّت العروض المميزة
      </h1>

      {offersLoading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
          {Array(3)
            .fill(null)
            .map((_, idx) => (
              <ProductCardGridSkeleton key={idx} />
            ))}
        </div>
      ) : hasOffers ? (
        <>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
            {offerProducts?.pages
              .flatMap((page) => page.products)
              .map((product) => (
                <ProductCardGrid key={product.id} product={product} />
              ))}
          </div>

          {/* Load more trigger element */}
          <div
            ref={intersection.ref}
            className="h-10 flex items-center justify-center my-8"
          >
            {isFetchingNextPage && (
              <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Image
            src="/images/emptyCart.svg"
            alt="لا توجد عروض حالياً"
            width={200}
            height={200}
            className="mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            لا توجد عروض متاحة حالياً
          </h2>
          <p className="text-gray-500 mb-8 max-w-md">
            تفقد موقعنا لاحقاً للحصول على أفضل العروض والخصومات
          </p>
          <Button asChild className="py-3 px-10">
            <Link href="/products">تصفح المنتجات</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
