"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";
import sahhaInstance from "@api/sahhaInstance";
import { useMutation } from "@tanstack/react-query";
import { OrderCreationLoading } from "@components/checkout/OrderCreationLoading";
import { OrderCreationError } from "@components/checkout/OrderCreationError";

interface OrderResponse {
  updatedOrder: {
    id: string;
    orderNumber: string;
    status: string;
    createdAt: string;
    subtotalBeforeFees: string;
    deliveryFee: string;
    totalPriceAfterFees: string;
    orderAddress: {
      fullname: string;
      phoneNumber: string;
      city: string;
      district: string;
      street: string;
      building: string;
    };
    orderItems: Array<{
      id: string;
      quantity: number;
      unitPrice: string;
      totalPrice: string;
      variant: {
        name: string;
        arabicName: string;
        product: {
          name: string;
          arabicName: string;
          media?: Array<{ url: string }>;
        };
      };
    }>;
  };
  paymentResponse: {
    data: {
      status: string;
      amount: number;
      currency: string;
      source: {
        type: string;
        company: string;
        name: string;
        number: string;
      };
    };
  };
  pointTransaction?: {
    pointsChanged: number;
  };
}

const CheckoutConfirmingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const orderData = useReadLocalStorage("order-data", {
    deserializer(value) {
      return JSON.parse(value);
    },
  });

  // Get status from URL parameters
  const status = searchParams.get("status");

  const { mutate, isPending } = useMutation({
    mutationFn: async (orderData: any) => {
      const res = await sahhaInstance.post("/orders", orderData);
      return res.data;
    },
    onSuccess: (data: OrderResponse) => {
      router.push(`/checkout/${data.updatedOrder.id}`);
    },
    onError: (error: any) => {
      setError(error?.response?.data?.message || "حدث خطأ أثناء معالجة الطلب");
    },
  });

  useEffect(() => {
    // If status is 'failed', show error immediately
    if (status === "failed") {
      setError("فشل في عملية الدفع. يرجى المحاولة مرة أخرى.");
      return;
    }

    // If status is 'paid' or no status, proceed with order creation
    if (orderData && (status === "paid" || !status)) {
      mutate(orderData);
    } else if (!orderData) {
      // No order data, redirect to home
      router.push("/");
    }
  }, [orderData, status, mutate, router]);

  // Show loading state
  if (isPending) {
    return <OrderCreationLoading />;
  }

  // Show error state
  if (error) {
    return <OrderCreationError error={error} />;
  }

  // Show loading state while waiting for order data
  if (!orderData) {
    return <OrderCreationLoading />;
  }

  return <OrderCreationLoading />;
};

export default CheckoutConfirmingPage;
