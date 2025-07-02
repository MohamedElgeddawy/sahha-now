"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderStepper } from "@/components/OrderStepper";
import { useOrderById } from "@/lib/hooks/use-orders";
import {
  CardLoading,
  ProfileLoadingMessages,
} from "@/components/ui/LoadingComponent";

type OrderDetailsProps = {
  orderId: string;
};

// Status mapping from English to Arabic
const getStatusInArabic = (status: string): string => {
  switch (status) {
    case "PENDING":
      return "قيد الانتظار";
    case "CONFIRMED":
      return "تم التأكيد";
    case "SHIPPED":
      return "تم الشحن";
    case "DELIVERED":
      return "تم التوصيل";
    case "CANCELLED":
      return "تم الإلغاء";
    case "RETURNED":
      return "تم الإرجاع";
    default:
      return status;
  }
};

export function OrderDetails({ orderId }: OrderDetailsProps) {
  const { data: order, isLoading, isError, error } = useOrderById(orderId);

  // Loading state
  if (isLoading) {
    return (
      <CardLoading
        message={ProfileLoadingMessages.orderDetails}
        animation="morphing"
      />
    );
  }

  // Error state
  if (isError || !order) {
    return (
      <div className="bg-white rounded-lg border border-gray-300 p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">حدث خطأ أثناء تحميل تفاصيل الطلب</p>
          <button
            onClick={() => window.location.reload()}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // Get main product image
  const getProductImage = (item: any) => {
    const mainMedia = item.variant.product.media?.find(
      (media: any) => media.isMain
    );
    return (
      mainMedia?.url ||
      item.variant.product.media?.[0]?.url ||
      "/images/product.jpg"
    );
  };

  const orderDetails = {
    id: order.orderNumber,
    date: new Date(order.createdAt).toLocaleDateString("ar-SA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    status: getStatusInArabic(order.status),
    paymentMethod: "نقداً", // This would come from API if available
    address: `${order.orderAddress.city} - ${order.orderAddress.district} - ${order.orderAddress.street} - ${order.orderAddress.building}`,
    phone: order.orderAddress.phoneNumber,
    items: order.orderItems.map((item) => ({
      id: item.id,
      name: item.variant.product.arabicName || item.variant.product.name,
      variantName: item.variant.arabicName || item.variant.name,
      quantity: item.quantity,
      price: parseFloat(item.unitPrice),
      image: getProductImage(item),
    })),
    subtotal: parseFloat(order.subtotalBeforeFees),
    shipping: parseFloat(order.deliveryFee),
    total: parseFloat(order.totalPriceAfterFees),
    points: parseInt(order.pointsEarned),
  };

  return (
    <motion.div
      className="bg-white rounded-lg p-3 sm:p-4 lg:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Order ID and Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">
          طلب #{orderDetails.id}
        </h2>
        <div className="text-gray-500 text-xs sm:text-sm">
          {orderDetails.date}
        </div>
      </div>

      {/* Order Status Stepper */}
      <OrderStepper
        currentStatus={order.status}
        orderDate={order.createdAt}
        confirmedAt={order.confirmedAt || undefined}
        deliveredAt={order.deliveredAt || undefined}
        cancelledAt={order.cancelledAt || undefined}
      />

      {/* Order Details */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Products Table - Mobile Card Layout + Desktop Table */}
        <div className="lg:col-span-2 order-1">
          {/* Mobile Card Layout */}
          <div className="block lg:hidden space-y-4">
            <h3 className="text-lg font-semibold mb-4">المنتجات</h3>
            {orderDetails.items.map((item) => (
              <div key={item.id} className="bg-gray-50 rounded-lg p-4 border">
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base mb-1 line-clamp-2">
                      {item.name}
                    </div>
                    {item.variantName && (
                      <div className="text-xs sm:text-sm text-gray-500 mb-2">
                        {item.variantName}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">السعر: </span>
                        <span className="font-medium">
                          {item.price.toFixed(2)} ر.س
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">الكمية: </span>
                        <span className="font-medium">{item.quantity}</span>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <span className="text-gray-600">الإجمالي: </span>
                      <span className="font-bold text-green-600">
                        {(item.quantity * item.price).toFixed(2)} ر.س
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden lg:block">
            <h3 className="text-lg font-semibold mb-4">المنتجات</h3>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">المنتج</TableHead>
                    <TableHead className="text-center">السعر</TableHead>
                    <TableHead className="text-center">الكمية</TableHead>
                    <TableHead className="text-left">الإجمالي</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderDetails.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-start gap-3">
                          <div className="relative w-14 h-14 xl:w-16 xl:h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium text-sm xl:text-base line-clamp-2">
                              {item.name}
                            </div>
                            {item.variantName && (
                              <div className="text-xs xl:text-sm text-gray-500 mt-1">
                                {item.variantName}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center text-sm xl:text-base">
                        {item.price.toFixed(2)} ر.س
                      </TableCell>
                      <TableCell className="text-center text-sm xl:text-base">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-left font-medium text-sm xl:text-base">
                        {(item.quantity * item.price).toFixed(2)} ر.س
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-2 lg:order-1">
          <h3 className="text-lg font-semibold mb-4 lg:hidden">ملخص الطلب</h3>
          <div className="bg-gray-50 p-4 lg:p-6 rounded-lg space-y-3 lg:space-y-4">
            <div className="flex justify-between items-start gap-2">
              <span className="text-sm lg:text-base font-medium flex-shrink-0">
                رقم الطلب
              </span>
              <span className="text-sm lg:text-base text-gray-700 text-left break-all">
                {orderDetails.id}
              </span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-sm lg:text-base font-medium flex-shrink-0">
                تاريخ الطلب
              </span>
              <span className="text-sm lg:text-base text-gray-700 text-left">
                {orderDetails.date}
              </span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-sm lg:text-base font-medium flex-shrink-0">
                طريقة الدفع
              </span>
              <span className="text-sm lg:text-base text-gray-700">
                {orderDetails.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-sm lg:text-base font-medium flex-shrink-0">
                العنوان
              </span>
              <span className="text-sm lg:text-base text-gray-700 text-right max-w-[200px] break-words">
                {orderDetails.address}
              </span>
            </div>
            <div className="flex justify-between items-start gap-2">
              <span className="text-sm lg:text-base font-medium flex-shrink-0">
                رقم الجوال
              </span>
              <span className="text-sm lg:text-base text-gray-700" dir="ltr">
                +966{orderDetails.phone}
              </span>
            </div>

            <div className="border-t pt-3 lg:pt-4 space-y-2 lg:space-y-3">
              <div className="flex justify-between gap-2">
                <span className="text-sm lg:text-base font-medium">
                  المجموع الفرعي
                </span>
                <span className="text-sm lg:text-base text-gray-700">
                  {orderDetails.subtotal.toFixed(2)} ر.س
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-sm lg:text-base font-medium">
                  خدمة التوصيل
                </span>
                <span className="text-sm lg:text-base text-gray-700">
                  {orderDetails.shipping.toFixed(2)} ر.س
                </span>
              </div>
              <div className="flex justify-between gap-2 border-t pt-3 lg:pt-4 border-gray-300">
                <span className="text-base lg:text-lg font-bold">الإجمالي</span>
                <span className="text-base lg:text-lg font-bold text-green-600">
                  {orderDetails.total.toFixed(2)} ر.س
                </span>
              </div>
              {orderDetails.points > 0 && (
                <div className="flex justify-between gap-2 bg-green-50 -mx-4 lg:-mx-6 px-4 lg:px-6 py-3 rounded-lg">
                  <span className="text-sm lg:text-base font-bold text-green-800">
                    النقاط المكتسبة
                  </span>
                  <span className="text-sm lg:text-base font-bold text-green-600">
                    {orderDetails.points} نقطة
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
