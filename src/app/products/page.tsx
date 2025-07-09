"use client";

import { useState, useEffect } from "react";
import ProductCardGrid from "@/components/products/ProductCardGrid";
import {
  useInfiniteProducts,
  useFiltersMetadata,
} from "@/lib/hooks/use-products";
import { useIntersectionObserver } from "usehooks-ts";
import { motion } from "motion/react";
import {
  FilterDrawer,
  MobileFilterTrigger,
} from "@/components/products/FilterDrawer";
import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCardList from "@/components/products/ProductCardList";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  resetFilters,
  setFilter,
  setMetadata,
} from "@/lib/redux/slices/filtersSlice";
import { useFilterParams } from "@/lib/hooks/use-filter-params";
import { ActiveFilters } from "@/components/products/ActiveFilters";
import { LoadingComponent } from "@/components/ui/LoadingComponent";
import { Filter } from "lucide-react";
import Image from "next/image";

function EmptyProductsScreen() {
  const { activeFilters } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const { updateURL } = useFilterParams();

  const hasFilters =
    (activeFilters?.categoryIds && activeFilters?.categoryIds?.length > 0) ||
    (activeFilters?.brandIds && activeFilters?.brandIds?.length > 0) ||
    activeFilters?.searchQuery ||
    activeFilters?.rating ||
    activeFilters?.hasDiscount ||
    activeFilters?.minPrice ||
    activeFilters?.maxPrice;

  const handleClearFilters = () => {
    dispatch(resetFilters());
    updateURL({ page: 1, limit: 12 });
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="relative">
          <div className="w-32 h-32 flex items-center justify-center mx-auto mb-4">
            <Image
              src="/images/emptyCart.svg"
              alt="Empty cart"
              width={128}
              height={128}
              className="w-full h-full"
            />
          </div>
          {hasFilters && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Filter className="w-4 h-4 text-blue-600" />
            </div>
          )}
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900">
            {hasFilters
              ? "لا توجد منتجات تطابق الفلاتر المحددة"
              : "لا توجد منتجات متاحة"}
          </h3>
          <p className="text-gray-500 max-w-md">
            {hasFilters
              ? "جرب تعديل الفلاتر أو البحث عن منتجات أخرى"
              : "في الوقت الحالي لا توجد منتجات متاحة للعرض"}
          </p>
        </div>

        {/* Actions */}
        {hasFilters && (
          <div className="flex justify-center">
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              مسح جميع الفلاتر
            </Button>
          </div>
        )}

        {/* Additional Info */}
        <div className="text-sm text-gray-400 space-y-1">
          <p>• تأكد من صحة كلمات البحث</p>
          <p>• جرب فلاتر مختلفة</p>
          <p>• تحقق من التصنيفات المتاحة</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { activeFilters, metadata } = useAppSelector((state) => state.filters);
  const { updateURL } = useFilterParams();
  const { data: filtersMetadata } = useFiltersMetadata();

  const [view, setView] = useState<"grid" | "list">("grid");

  // const sortOptions = [
  //   { id: "default", label: "الترتيب الافتراضي" },
  //   { id: "newest", label: "الأحدث أولاً" },
  //   { id: "price_asc", label: "الأقل سعراً إلى الأعلى" },
  //   { id: "price_desc", label: "الأعلى سعراً إلى الأقل" },
  //   { id: "best_selling", label: "الأكثر مبيعاً" },
  //   { id: "highest_rated", label: "الأعلى تقييماً" },
  // ];

  const { ref } = useIntersectionObserver({
    onChange: (isIntersecting) => {
      if (isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  // Load metadata on mount
  useEffect(() => {
    if (filtersMetadata && !metadata) {
      dispatch(setMetadata(filtersMetadata));
    }
  }, [filtersMetadata, metadata, dispatch]);

  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteProducts(activeFilters);

  // const handleSortChange = (sortId: string) => {
  //   let sortValue = "default";
  //   switch (sortId) {
  //     case "newest":
  //       sortValue = "newest";
  //       break;
  //     case "price_asc":
  //       sortValue = "price_asc";
  //       break;
  //     case "price_desc":
  //       sortValue = "price_desc";
  //       break;
  //     case "best_selling":
  //       sortValue = "bestselling";
  //       break;
  //     case "highest_rated":
  //       sortValue = "rating_desc";
  //       break;
  //   }

  //   const newFilters = { ...activeFilters, sort: sortValue };
  //   dispatch(setFilter({ sort: sortValue }));
  //   updateURL(newFilters);
  // };

  const handleDiscountChange = (checked: boolean) => {
    if (checked) {
      // When checked, add hasDiscount: true
      dispatch(setFilter({ hasDiscount: true }));
      updateURL({ ...activeFilters, hasDiscount: true });
    } else {
      // When unchecked, explicitly set hasDiscount: false
      // Our reducer will handle removing it from state
      dispatch(setFilter({ hasDiscount: false }));

      // For URL, create a new object without hasDiscount
      const newFilters = { ...activeFilters };
      delete newFilters.hasDiscount;
      updateURL(newFilters);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetFilters());
    };
  }, []);

  return (
    <motion.div
      className="py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-2 sm:mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        المنتجات
      </motion.h1>
      {/* <div className="py-0 py-0 mb-2 sm:mb-4">
        <Announcements />
      </div> */}
      <FilterDrawer>
        {/* Active filters */}
        <ActiveFilters />

        {/* Top filters and sorting */}
        <div className="flex flex-wrap items-center justify-between p-4 rounded-t-lg mb-6">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Trigger */}
            <MobileFilterTrigger />

            {/* <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <span className="ms-2 text-sm">
                    {sortOptions.find(
                      (opt) => opt.id === (activeFilters.sort || "default")
                    )?.label || "الترتيب الافتراضي"}
                  </span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 text-right">
                {sortOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.id}
                    onClick={() => handleSortChange(option.id)}
                    className={
                      activeFilters.sort === option.id ? "bg-gray-100" : ""
                    }
                  >
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu> */}
            <Button
              variant="ghost"
              size="sm"
              className={`p-1 ${
                view === "grid" ? "bg-green-500/20 text-green-500" : ""
              }`}
              onClick={() => setView("grid")}
            >
              <Grid size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`p-1 ${
                view === "list" ? "bg-green-500/20 text-green-500" : ""
              }`}
              onClick={() => setView("list")}
            >
              <List size={18} />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Checkbox
                id="discount-only"
                checked={activeFilters.hasDiscount || false}
                onCheckedChange={(checked) =>
                  handleDiscountChange(checked === true)
                }
              />
              <label htmlFor="discount-only" className="text-sm">
                المنتجات ذات الخصم فقط
              </label>
            </div>
          </div>
        </div>

        {/* Product list */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                >
                  <ProductCardGrid product={{}} isLoading />
                </motion.div>
              ))}
          </div>
        ) : isError ? (
          <motion.div
            className="text-center py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-red-500">حدث خطأ أثناء تحميل المنتجات</p>
          </motion.div>
        ) : products && products.length > 0 ? (
          <>
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "flex flex-col gap-4"
              }
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={view === "list" ? "w-full" : ""}
                >
                  {view === "grid" ? (
                    <ProductCardGrid product={product} />
                  ) : (
                    <ProductCardList product={product} />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Load more trigger */}
            <div ref={ref} className="flex justify-center mt-8">
              {isFetchingNextPage && (
                <LoadingComponent
                  animation="dots"
                  variant="centered"
                  showMessage
                />
              )}
            </div>
          </>
        ) : (
          <EmptyProductsScreen />
        )}
      </FilterDrawer>
    </motion.div>
  );
}
