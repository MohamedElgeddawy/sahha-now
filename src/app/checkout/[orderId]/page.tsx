"use client";

import React, { use, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckoutOrderDetails } from "@components/checkout/CheckoutOrderDetails";
import { LoadingOrderDetails } from "@components/checkout/LoadingOrderDetails";
import { ErrorOrderDetails } from "@components/checkout/ErrorOrderDetails";
import { useOrderById } from "@hooks/use-orders";

const OrderDetailsPage = ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const { orderId } = use(params);

  const { data: order, isLoading, error } = useOrderById(orderId);

  if (isLoading) {
    return <LoadingOrderDetails />;
  }

  if (error || !order) {
    return <ErrorOrderDetails error={error} />;
  }

  return <CheckoutOrderDetails order={order} />;
};

export default OrderDetailsPage;
