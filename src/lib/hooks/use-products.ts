import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchFavoriteProducts,
  fetchOfferProducts,
  fetchProduct,
  fetchProductReviewStats,
  fetchProducts,
  Product,
  ProductFilters,
  ProductsResponse,
  ReviewStats,
} from "../api/products";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  infinite: (filters: ProductFilters) =>
    [...productKeys.lists(), "infinite", filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  reviews: () => [...productKeys.all, "reviews"] as const,
  // reviewsList: (id: string, filters: ReviewFilters = {}) =>
  //   [...productKeys.reviews(), "list", id, filters] as const,
  reviewStats: (id: string) => [...productKeys.reviews(), "stats", id] as const,
  favorites: () => [...productKeys.all, "favorites"] as const,
  offers: () => [...productKeys.all, "offers"] as const,
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

export function useProductReviewStats(productId: string) {
  return useQuery<ReviewStats>({
    queryKey: productKeys.reviewStats(productId),
    queryFn: () => fetchProductReviewStats(productId),
    enabled: !!productId,
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

// export function useProductReviews(
//   productId: string,
//   filters: ReviewFilters = {}
// ) {
//   return useQuery<ReviewsResponse>({
//     queryKey: productKeys.reviewsList(productId, filters),
//     queryFn: () => fetchProductReviews(productId, filters),
//     enabled: !!productId,
//   });
// }

export function useFavoriteProducts() {
  return useInfiniteQuery<Product[]>({
    queryKey: productKeys.favorites(),
    queryFn: async ({ pageParam = 1 }) => {
      // Pass the current page as pageParam
      return fetchFavoriteProducts({ page: pageParam as number });
    },
    getNextPageParam: (lastPage, allPages) => {
      // If there are products in the last page, there might be more
      if (lastPage.length === 0) {
        return undefined;
      }
      // Return the next page number
      return allPages.length + 1;
    },
    initialPageParam: 1,
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
