import { useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setFilters } from "@/lib/redux/slices/filtersSlice";
import { ProductFilters } from "@/lib/api/products";

export function useFilterParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.filters.activeFilters);

  // Initialize filters from URL on mount
  useEffect(() => {
    const params: ProductFilters = {
      page: 1,
      limit: 12,
    };

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
          }
          break;
        case "brandIds":
          const brandValues = value.split(",").filter(Boolean);
          if (brandValues.length > 0) {
            params.brandIds = brandValues;
          }
          break;
        case "searchQuery":
        case "sort":
          params[key] = value;
          break;
      }
    });

    dispatch(setFilters(params));
  }, []);

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters: ProductFilters) => {
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

      if (newFilters.categoryIds && newFilters.categoryIds.length > 0) {
        params.set("categoryIds", newFilters.categoryIds.join(","));
      } else {  
        params.delete("categoryIds");
      }
      if (newFilters.brandIds && newFilters.brandIds.length > 0) {
        params.set("brandIds", newFilters.brandIds.join(","));
      } else {
        params.delete("brandIds");
      }

      // Update the URL without causing a navigation
      const newURL = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.replace(newURL, { scroll: false });
    },
    [pathname]
  );

  return { updateURL };
}
