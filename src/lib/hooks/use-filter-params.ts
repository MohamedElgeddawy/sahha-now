import { useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  setFilters,
  setSelectedCategories,
  setSelectedBrands,
} from "@/lib/redux/slices/filtersSlice";
import { ProductFilters } from "@/lib/api/products";

export function useFilterParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters.activeFilters);
  const selectedCategories = useAppSelector(
    (state) => state.filters.selectedCategories
  );
  const selectedBrands = useAppSelector(
    (state) => state.filters.selectedBrands
  );

  // Initialize filters from URL on mount
  useEffect(() => {
    const params: ProductFilters = {
      page: 1,
      limit: 12,
    };
    const categories: string[] = [];
    const brands: string[] = [];

    searchParams.forEach((value, key) => {
      switch (key) {
        case "page":
        case "limit":
        case "minPrice":
        case "maxPrice":
        case "rating":
          params[key] = Number(value);
          break;
        case "hasDiscount":
          params[key] = value === "true";
          break;
        case "categoryIds":
          // Handle both single category and comma-separated categories
          const categoryValues = value.split(",").filter(Boolean);
          if (categoryValues.length > 0) {
            params.categoryIds = categoryValues;
            categories.push(...categoryValues);
          }
          break;
        case "brandIds":
          const brandValues = value.split(",").filter(Boolean);
          if (brandValues.length > 0) {
            params.brandIds = brandValues;
            brands.push(...brandValues);
          }
          break;
        case "search":
        case "sort":
          params[key] = value;
          break;
      }
    });

    dispatch(setFilters(params));
    if (categories.length > 0) {
      dispatch(setSelectedCategories(categories));
    }
    if (brands.length > 0) {
      dispatch(setSelectedBrands(brands));
    }
  }, []);

  // Update URL when filters change
  const updateURL = useCallback(
    (
      newFilters: ProductFilters,
      newSelectedCategories?: string[],
      newSelectedBrands?: string[]
    ) => {
      const params = new URLSearchParams();

      // Add all active filters to URL
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          if (key === "page" && value === 1) {
            // Don't include page=1 in URL
            return;
          }
          if (key === "limit" && value === 12) {
            // Don't include default limit in URL
            return;
          }
          params.set(key, value.toString());
        }
      });

      // Add selected categories and brands if provided
      const categoriesToUse =
        newSelectedCategories !== undefined
          ? newSelectedCategories
          : selectedCategories;
      const brandsToUse =
        newSelectedBrands !== undefined ? newSelectedBrands : selectedBrands;

      if (categoriesToUse.length > 0) {
        params.set("categoryIds", categoriesToUse.join(","));
      }
      if (brandsToUse.length > 0) {
        params.set("brandIds", brandsToUse.join(","));
      }

      // Update the URL without causing a navigation
      const newURL = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newURL, { scroll: false });
    },
    [pathname, router, selectedCategories, selectedBrands]
  );

  return { updateURL };
}
