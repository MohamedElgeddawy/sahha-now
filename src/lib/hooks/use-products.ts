import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchFavoriteProducts,
  fetchFavoriteProductsCount,
  fetchOfferProducts,
  fetchProduct,
  fetchProducts,
  Product,
  ProductFilters,
  ProductsResponse,
  fetchCategories,
  CategoryResponse,
  fetchFiltersMetadata,
  FiltersMetadata,
  FavoriteProductsResponse,
} from "../api/products";
import { useAppSelector } from "../redux/hooks";
import { selectIsAuthenticated } from "../redux/slices/authSlice";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  infinite: (filters: ProductFilters) =>
    [...productKeys.lists(), "infinite", filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  favorites: () => [...productKeys.all, "favorites"] as const,
  offers: () => [...productKeys.all, "offers"] as const,
  favoritesCount: () => [...productKeys.all, "favoritesCount"] as const,
  categories: ["categories"] as const,
  filtersMetadata: ["filtersMetadata"] as const,
};

export function useProducts(filters: ProductFilters = {}) {
  return useQuery<ProductsResponse>({
    queryKey: productKeys.list(filters),
    queryFn: () => fetchProducts(filters),
  });
}

export function useFeaturedProducts() {
  return useProducts({ limit: 10 });
}

export function useProduct(id: string) {
  return useQuery<Product>({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
  });
}

export function useInfiniteProducts(filters: ProductFilters = {}) {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: productKeys.infinite(filters),
    queryFn: async ({ pageParam = 1 }) => {
      // Pass the current page as pageParam
      return fetchProducts({ ...filters, page: pageParam as number });
    },
    getNextPageParam: (lastPage, allPages) => {
      // If there are products in the last page, there might be more
      if (lastPage.products.length === 0) {
        return undefined;
      }
      // Return the next page number
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
}

export function useFavoriteProducts() {
  const isAuth = useAppSelector(selectIsAuthenticated);
  return useInfiniteQuery({
    queryKey: [...productKeys.favorites(), isAuth],
    queryFn: async ({ pageParam = 1 }) => {
      // Pass the current page as pageParam
      return fetchFavoriteProducts({ page: pageParam as number });
    },
    select: (data) => data.pages.flatMap((page) => page.favourites),
    getNextPageParam: (lastPage, allPages) => {
      // If there are products in the last page, there might be more
      if (lastPage.favourites.length === 0) {
        return undefined;
      }
      // Return the next page number
      return allPages.length + 1;
    },
    enabled: isAuth,
    initialPageParam: 1,
  });
}
export function useFavoriteProductsCount() {
  const isAuth = useAppSelector(selectIsAuthenticated);

  return useQuery<number>({
    queryKey: [...productKeys.favoritesCount(), isAuth],
    queryFn: fetchFavoriteProductsCount,
    enabled: isAuth,
  });
}

export function useOfferProducts() {
  return useInfiniteQuery<ProductsResponse>({
    queryKey: productKeys.offers(),
    queryFn: async ({ pageParam = 1 }) => {
      // Pass the current page as pageParam
      return fetchOfferProducts({ page: pageParam as number });
    },
    getNextPageParam: (lastPage, allPages) => {
      // If there are products in the last page, there might be more
      if (lastPage.products.length === 0) {
        return undefined;
      }
      // Return the next page number
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
}
export function useCategories() {
  return useQuery<CategoryResponse>({
    queryKey: productKeys.categories,
    queryFn: fetchCategories,
  });
}

export function useFiltersMetadata() {
  return useQuery<FiltersMetadata>({
    queryKey: productKeys.filtersMetadata,
    queryFn: fetchFiltersMetadata,
  });
}
