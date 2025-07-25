import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loyaltyApi, LoyaltyTransactionsParams } from "@api/loyalty";
import { toast } from "sonner";

// Query Keys
export const loyaltyKeys = {
  all: ["loyalty"] as const,
  transactions: (params: LoyaltyTransactionsParams) =>
    [...loyaltyKeys.all, "transactions", params] as const,
  balance: () => [...loyaltyKeys.all, "balance"] as const,
};

// Hooks
export function useLoyaltyTransactions(params: LoyaltyTransactionsParams = {}) {
  return useQuery({
    queryKey: loyaltyKeys.transactions(params),
    queryFn: () => loyaltyApi.getTransactions(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useLoyaltyBalance() {
  return useQuery({
    queryKey: loyaltyKeys.balance(),
    queryFn: loyaltyApi.getBalance,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useRedeemPoints() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loyaltyApi.redeemPoints,
    onSuccess: () => {
      // Invalidate and refetch loyalty queries
      queryClient.invalidateQueries({ queryKey: loyaltyKeys.all });

      toast.success("تم استبدال النقاط بنجاح!");
    },
    onError: () => {
      const errorMessage = "حدث خطأ أثناء استبدال النقاط";
      toast.error(errorMessage);
    },
  });
}
