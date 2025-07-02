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
import { AlertTriangle, RefreshCw, Wifi } from "lucide-react";
import { toast } from "sonner";

export default function FavoritesPage() {
  const router = useRouter();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const {
    data: favoriteProducts,
    isLoading: favoritesLoading,
    error: favoritesError,
    refetch: refetchFavorites,
  } = useFavoriteProducts();
  const {
    data: recommendedProducts,
    isLoading: recommendationsLoading,
    error: recommendationsError,
  } = useProducts({ limit: 8 });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const hasFavorites = useMemo(
    () => favoriteProducts?.length && favoriteProducts?.length > 0,
    [favoriteProducts]
  );

  // Handle retry for favorites
  const handleRetryFavorites = async () => {
    try {
      await refetchFavorites();
      toast.success("تم تحديث قائمة المفضلات بنجاح");
    } catch (error) {
      toast.error("فشل في تحديث قائمة المفضلات");
    }
  };

  // Error state for favorites
  if (favoritesError && !favoritesLoading) {
    return (
      <>
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "قائمة المفضلات", href: "/favorites" },
          ]}
        />
        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
          <div className="mb-6">
            {navigator.onLine ? (
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            ) : (
              <Wifi className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            )}
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
            {navigator.onLine
              ? "حدث خطأ في تحميل المفضلات"
              : "لا يوجد اتصال بالإنترنت"}
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-6 max-w-md">
            {navigator.onLine
              ? "نعتذر عن هذا الخطأ، يرجى المحاولة مرة أخرى"
              : "يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى"}
          </p>
          <div className="flex gap-4">
            <Button
              onClick={handleRetryFavorites}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              إعادة المحاولة
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">تصفح المنتجات</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "قائمة المفضلات", href: "/favorites" },
        ]}
      />
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800 rtl:text-right">
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
        <div className="grid grid-cols-1 gap-4 md:gap-6">
          {favoriteProducts?.map((product) => (
            <ProductCardList
              key={product.id}
              product={product}
              isFavorite={true}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8 md:py-16 text-center px-4">
          <Image
            src="/images/emptyCart.svg"
            alt="قائمة المفضلات فارغة"
            width={200}
            height={200}
            className="mb-4 md:mb-6 w-32 h-32 md:w-48 md:h-48 lg:w-52 lg:h-52"
          />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2">
            قائمة المفضلات فارغة حاليا
          </h2>
          <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8 max-w-md">
            ابدأ التسوق الآن وأضف منتجاتك المفضلة هنا سيظهروا!
          </p>
          <Button
            asChild
            className="py-2 px-6 md:py-3 md:px-10 text-sm md:text-base"
          >
            <Link href="/products">تسوق الآن</Link>
          </Button>
        </div>
      )}

      <div className="mt-12 md:mt-16">
        {recommendationsError ? (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-600 mb-4">لا يمكن تحميل التوصيات حالياً</p>
            <Button variant="outline" asChild>
              <Link href="/products">تصفح جميع المنتجات</Link>
            </Button>
          </div>
        ) : (
          <ProductCarousel
            title="توصيات خاصة لك"
            products={recommendedProducts?.products || []}
            isLoading={recommendationsLoading}
          />
        )}
      </div>
    </>
  );
}
