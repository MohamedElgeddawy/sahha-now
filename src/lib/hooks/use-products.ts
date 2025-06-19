import { useQuery } from "@tanstack/react-query";
import {
  fetchProduct,
  fetchProductReviewStats,
  fetchProducts,
  Product,
  ProductFilters,
  ReviewStats,
} from "../api/products";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: ProductFilters) => [...productKeys.lists(), filters] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  reviews: () => [...productKeys.all, "reviews"] as const,
  // reviewsList: (id: string, filters: ReviewFilters = {}) =>
  //   [...productKeys.reviews(), "list", id, filters] as const,
  reviewStats: (id: string) => [...productKeys.reviews(), "stats", id] as const,
};

export function useProducts(filters: ProductFilters = {}) {
  return useQuery<Product[]>({
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
