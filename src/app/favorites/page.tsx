"use client";

import { Button } from "@/components/ui/button";
import { useFavoriteProducts, useProducts } from "@/lib/hooks/use-products";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectIsAuthenticated } from "@/lib/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import ProductCardList from "@/components/products/ProductCardList";
import ProductCarousel from "@/components/products/ProductCarousel";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

export default function FavoritesPage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { data: favoriteProducts, isLoading: favoritesLoading } =
    useFavoriteProducts();
  const { data: recommendedProducts, isLoading: recommendationsLoading } =
    useProducts({ limit: 8 });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const hasFavorites = useMemo(
    () =>
      favoriteProducts?.pages.flatMap((page) => page).length &&
      favoriteProducts?.pages.flatMap((page) => page).length > 0,
    [favoriteProducts]
  );

  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "قائمة المفضلات", href: "/favorites" },
        ]}
      />
      <h1 className="text-3xl font-bold mb-6 text-gray-800 rtl:text-right">
        قائمة المفضلات
      </h1>

      {favoritesLoading ? (
        <div className="grid grid-cols-1 gap-4">
          {Array(3)
            .fill(null)
            .map((_, idx) => (
              <ProductCardList key={idx} product={{}} isLoading={true} />
            ))}
        </div>
      ) : hasFavorites ? (
        <div className="grid grid-cols-1 gap-6">
          {favoriteProducts?.pages
            .flatMap((page) => page)
            .map((product) => (
              <ProductCardList
                key={product.id}
                product={product}
                isFavorite={true}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Image
            src="/images/emptyCart.svg"
            alt="قائمة المفضلات فارغة"
            width={200}
            height={200}
            className="mb-6"
          />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            قائمة المفضلات فارغة حاليا
          </h2>
          <p className="text-gray-500 mb-8 max-w-md">
            ابدأ التسوق الآن وأضف منتجاتك المفضلة هنا سيظهروا!
          </p>
          <Button asChild className="py-3 px-10">
            <Link href="/products">تسوق الآن</Link>
          </Button>
        </div>
      )}

      <div className="mt-16">
        <ProductCarousel
          title="توصيات خاصة لك"
          products={recommendedProducts?.products || []}
          isLoading={recommendationsLoading}
        />
      </div>
    </>
  );
}
