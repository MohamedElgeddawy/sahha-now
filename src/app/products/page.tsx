"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCardGrid from "@/components/products/ProductCardGrid";
import { useInfiniteProducts } from "@/lib/hooks/use-products";
import { ProductFilters } from "@/lib/api/products";
import { Input } from "@/components/ui/input";
import { useIntersectionObserver } from "usehooks-ts";
import { motion } from "motion/react";
import FilterSection from "@/components/products/FilterSection";
import RatingFilterSection from "@/components/products/RatingFilterSection";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCardList from "@/components/products/ProductCardList";

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 12,
  });

  const [view, setView] = useState<"grid" | "list">("grid");
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);
  const [sortOption, setSortOption] = useState<string>("default");

  const sortOptions = [
    { id: "default", label: "الترتيب الافتراضي" },
    { id: "newest", label: "الأحدث أولاً" },
    { id: "price_asc", label: "الأقل سعراً إلى الأعلى" },
    { id: "price_desc", label: "الأعلى سعراً إلى الأقل" },
    { id: "best_selling", label: "الأكثر مبيعاً" },
    { id: "highest_rated", label: "الأعلى تقييماً" },
  ];

  const { ref, isIntersecting } = useIntersectionObserver();

  // State to track which sections are collapsed
  const [collapsedSections, setCollapsedSections] = useState({
    categories: false,
    brands: false,
    featured: false,
    ratings: false,
  });

  // Toggle collapse function
  const toggleCollapse = (
    section: "categories" | "brands" | "featured" | "ratings"
  ) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteProducts(filters);

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    // Update filters when sort option changes
    if (sortOption === "newest") {
      setFilters((prev) => ({ ...prev, sort: "newest" }));
    } else if (sortOption === "price_asc") {
      setFilters((prev) => ({ ...prev, sort: "price_asc" }));
    } else if (sortOption === "price_desc") {
      setFilters((prev) => ({ ...prev, sort: "price_desc" }));
    } else if (sortOption === "best_selling") {
      setFilters((prev) => ({ ...prev, sort: "bestselling" }));
    } else if (sortOption === "highest_rated") {
      setFilters((prev) => ({ ...prev, sort: "rating_desc" }));
    } else {
      setFilters((prev) => ({ ...prev, sort: "default" }));
    }
  }, [sortOption]);

  useEffect(() => {
    // Update filters when discount filter changes
    if (onlyDiscounted) {
      setFilters((prev) => ({ ...prev, hasDiscount: true }));
    } else {
      setFilters((prev) => {
        const newFilters = { ...prev };
        delete newFilters.hasDiscount;
        return newFilters;
      });
    }
  }, [onlyDiscounted]);

  const handleFilterChange = (name: string, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value, page: 1 }));
  };

  const handleCategoryChange = (categoryName: string) => {
    handleFilterChange("category", categoryName);
  };

  const handleRatingChange = (rating: number) => {
    handleFilterChange("rating", rating);
  };

  // Category filters data from the image
  const categories = [
    { name: "العناية بالأم والطفل", count: 321 },
    { name: "المكياج والعناية بالجمال", count: 214 },
    { name: "العناية بالبشرة", count: 221 },
    { name: "العناية بالشعر", count: 125 },
    { name: "العناية الشخصية", count: 50 },
    { name: "الأدوية والعلاجات", count: 351 },
    { name: "الفيتامينات والتغذية الصحية", count: 98 },
  ];

  // Brand filters data from the image
  const brands = [
    { name: "كوفي", count: 32 },
    { name: "لا روش بوزاي", count: 97 },
    { name: "افين", count: 80 },
    { name: "فلوريدا باريس", count: 33 },
    { name: "يوسيرين", count: 37 },
  ];

  // Featured categories from the image
  const featuredCategories = [
    { name: "الأكثر مبيعًا", count: 32 },
    { name: "وصل حديثًا", count: 97 },
    { name: "تخفيضات", count: 80 },
    { name: "سعر خاص", count: 33 },
  ];

  // Flatten product data from multiple pages
  const products = useMemo(() => {
    return data?.pages.flatMap((page) => page.products) || [];
  }, [data]);
  const totalProducts = useMemo(() => {
    return (
      Number(data?.pages[0]?.totalPages) * (data?.pages[0]?.limit || 12) || 0
    );
  }, [data]);

  return (
    <motion.div
      className="py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        المنتجات
      </motion.h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <div className="lg:w-1/4 space-y-6">
          {/* Categories filter */}
          <FilterSection
            title="تسوق بالفئات"
            items={categories}
            isCollapsed={collapsedSections.categories}
            onToggleCollapse={() => toggleCollapse("categories")}
            onItemSelect={handleCategoryChange}
            selectedItem={filters.category}
          />

          {/* Brands filter */}
          <FilterSection
            title="تسوق بالعلامة التجارية"
            items={brands}
            isCollapsed={collapsedSections.brands}
            onToggleCollapse={() => toggleCollapse("brands")}
            searchInput={<Input placeholder="ابحث عن العلامة التجارية" />}
          />

          {/* Featured categories */}
          <FilterSection
            title="التصنيفات المميزة"
            items={featuredCategories}
            isCollapsed={collapsedSections.featured}
            onToggleCollapse={() => toggleCollapse("featured")}
          />

          {/* Rating filter */}
          <RatingFilterSection
            title="تسوق بالتقييم"
            isCollapsed={collapsedSections.ratings}
            onToggleCollapse={() => toggleCollapse("ratings")}
            selectedRating={filters.rating as number}
            onRatingSelect={handleRatingChange}
          />
        </div>

        {/* Products grid */}
        <div className="lg:w-3/4">
          {/* Top filters and sorting */}
          <div className="flex flex-wrap items-center justify-between p-4 rounded-t-lg mb-6">
            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <span className="ms-2 text-sm">
                      {sortOptions.find((opt) => opt.id === sortOption)
                        ?.label || "الترتيب الافتراضي"}
                    </span>
                    <ChevronDown size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 text-right">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.id}
                      onClick={() => setSortOption(option.id)}
                      className={sortOption === option.id ? "bg-gray-100" : ""}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
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
              <div className="text-sm ml-4">
                عرض 1-{Math.min(products.length, filters.limit || 12)} منتج من{" "}
                {totalProducts} منتج
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="discount-only"
                  checked={onlyDiscounted}
                  onCheckedChange={(checked) =>
                    setOnlyDiscounted(checked === true)
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
          ) : (
            <>
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
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
                  <motion.div
                    className="py-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    جاري التحميل...
                  </motion.div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
