import { useQuery } from "@tanstack/react-query";
import { getOrders, getOrderById, OrdersParams } from "../api/orders";

export const useOrders = (params: OrdersParams = {}) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => getOrders(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useOrderById = (orderId: string) => {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
