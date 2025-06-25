import React from "react";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  resetFilters,
  toggleCategory,
  toggleBrand,
  setFilter,
} from "@/lib/redux/slices/filtersSlice";
import { Button } from "@/components/ui/button";
import { useFilterParams } from "@/lib/hooks/use-filter-params";

export function ActiveFilters() {
  const dispatch = useAppDispatch();
  const { updateURL } = useFilterParams();
  const { activeFilters, selectedCategories, selectedBrands, metadata } =
    useAppSelector((state) => state.filters);

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    activeFilters.rating ||
    activeFilters.hasDiscount ||
    activeFilters.minPrice ||
    activeFilters.maxPrice ||
    (activeFilters.sort && activeFilters.sort !== "default");

  if (!hasActiveFilters) return null;

  const handleRemoveCategory = (categoryId: string) => {
    dispatch(toggleCategory(categoryId));
    const newCategories = selectedCategories.filter((id) => id !== categoryId);
    updateURL(activeFilters, newCategories, selectedBrands);
  };

  const handleRemoveBrand = (brandId: string) => {
    dispatch(toggleBrand(brandId));
    const newBrands = selectedBrands.filter((id) => id !== brandId);
    updateURL(activeFilters, selectedCategories, newBrands);
  };

  const handleRemoveFilter = (filterKey: keyof typeof activeFilters) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterKey];
    dispatch(setFilter(newFilters));
    updateURL(newFilters, selectedCategories, selectedBrands);
  };

  const handleClearAll = () => {
    dispatch(resetFilters());
    updateURL({ page: 1, limit: 12 }, [], []);
  };

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-sm">الفلاتر النشطة</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
          className="text-red-600 hover:text-red-700"
        >
          مسح الكل
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Categories */}
        {selectedCategories.map((categoryId) => {
          const category = metadata?.categories.find(
            (c) => c.id === categoryId
          );
          if (!category) return null;

          return (
            <div
              key={categoryId}
              className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm"
            >
              <span>{category.arabicName || category.name}</span>
              <button
                onClick={() => handleRemoveCategory(categoryId)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}

        {/* Brands */}
        {selectedBrands.map((brandId) => {
          const brand = metadata?.brands.find((b) => b.id === brandId);
          if (!brand) return null;

          return (
            <div
              key={brandId}
              className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm"
            >
              <span>{brand.arabicName || brand.name}</span>
              <button
                onClick={() => handleRemoveBrand(brandId)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}

        {/* Rating */}
        {activeFilters.rating && (
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm">
            <span>التقييم: {activeFilters.rating}+ نجوم</span>
            <button
              onClick={() => {
                const newFilters = { ...activeFilters };
                delete newFilters.rating;
                dispatch(setFilter({ rating: undefined }));
                updateURL(newFilters, selectedCategories, selectedBrands);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Discount */}
        {activeFilters.hasDiscount && (
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm">
            <span>منتجات مخفضة</span>
            <button
              onClick={() => {
                const newFilters = { ...activeFilters };
                delete newFilters.hasDiscount;
                dispatch(setFilter({ hasDiscount: false }));
                updateURL(newFilters, selectedCategories, selectedBrands);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Price Range */}
        {(activeFilters.minPrice || activeFilters.maxPrice) && (
          <div className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-gray-200 rounded-full text-sm">
            <span>
              السعر: {activeFilters.minPrice || 0} -{" "}
              {activeFilters.maxPrice || "∞"} ريال
            </span>
            <button
              onClick={() => {
                const newFilters = { ...activeFilters };
                delete newFilters.minPrice;
                delete newFilters.maxPrice;
                dispatch(
                  setFilter({
                    minPrice: undefined,
                    maxPrice: undefined,
                  })
                );
                updateURL(newFilters, selectedCategories, selectedBrands);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
