import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  fetchProductReviews,
  fetchProductStats,
  ReviewStats,
} from "@api/reviews";
import { productKeys } from "./use-products";

export const reviewKeys = {
  all: (id: string) => [productKeys.detail(id), "reviews"] as const,
  reviews: (id: string) => [...reviewKeys.all(id), "reviews"] as const,
  reviewsList: (id: string) => [...reviewKeys.reviews(id), "list"] as const,
  reviewStats: (id: string) => [...reviewKeys.reviews(id), "stats"] as const,
};

export function useProductStats(productId: string) {
  return useQuery<ReviewStats>({
    queryKey: reviewKeys.reviewStats(productId),
    queryFn: () => fetchProductStats(productId),
    enabled: !!productId,
  });
}

export function useProductReviews(id: string) {
  return useInfiniteQuery({
    queryKey: reviewKeys.reviewsList(id),
    queryFn: ({ pageParam = 1 }) => fetchProductReviews(id, pageParam, 10),
    select: (data) => data.pages.flatMap((page) => page.reviews),
    getNextPageParam: (lastPage) => {
      if (lastPage.totalPages > lastPage.page) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!id,
  });
}
