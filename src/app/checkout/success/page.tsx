"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useReadLocalStorage } from "usehooks-ts";
import sahhaInstance from "@/lib/api/sahhaInstance";
import { useMutation } from "@tanstack/react-query";
import {
  Loader2,
  XCircle,
  CreditCard,
  MapPin,
  User,
  Phone,
  Calendar,
  Package,
} from "lucide-react";

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

const CheckoutSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderResponse, setOrderResponse] = useState<OrderResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const orderData = useReadLocalStorage("order-data", {
    deserializer(value) {
      return JSON.parse(value);
    },
  });

  // Get status from URL parameters
  const status = searchParams.get("status");

  const { mutate } = useMutation({
    mutationFn: async (orderData: any) => {
      const res = await sahhaInstance.post("/orders", orderData);
      return res.data;
    },
    onSuccess: (data: OrderResponse) => {
      setOrderResponse(data);
      setIsLoading(false);
    },
    onError: (error: any) => {
      setError(error?.response?.data?.message || "حدث خطأ أثناء معالجة الطلب");
      setIsLoading(false);
    },
  });

  useEffect(() => {
    // If status is 'failed', show error immediately
    if (status === "failed") {
      setError("فشل في عملية الدفع. يرجى المحاولة مرة أخرى.");
      setIsLoading(false);
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

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleRetryPayment = () => {
    router.push("/checkout");
  };

  // Enhanced payment method icon component
  const PaymentMethodIcon = ({ company }: { company: string }) => {
    const iconMap: Record<string, string> = {
      visa: "/icons/payment/VISA.svg",
      mastercard: "/icons/payment/MASTERCARD.svg",
      mada: "/icons/payment/MADA.svg",
    };

    const icon = iconMap[company.toLowerCase()];

    if (icon) {
      return (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2"
        >
          <Image
            src={icon}
            alt={company}
            width={32}
            height={20}
            className="object-contain"
          />
          <span>
            {company === "visa"
              ? "فيزا"
              : company === "mastercard"
              ? "ماستركارد"
              : company === "mada"
              ? "مدى"
              : "بطاقة ائتمان"}
          </span>
        </motion.div>
      );
    }

    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        className="flex items-center gap-2"
      >
        <CreditCard className="w-5 h-5" />
        <span>بطاقة ائتمان</span>
      </motion.div>
    );
  };

  // Enhanced loading animation with floating particles
  const LoadingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-primary/20 rounded-full"
          initial={{
            x: Math.random() * 400,
            y: Math.random() * 400,
            scale: 0,
          }}
          animate={{
            y: [null, -20, 0],
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  // Loading state with enhanced animations
  if (isLoading) {
    return (
      <>
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "المتجر", href: "/products" },
            { label: "تأكيد الطلب", href: "/checkout/success" },
          ]}
        />

        <motion.div
          className="flex flex-col items-center justify-center my-12 text-center relative min-h-[400px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <LoadingParticles />

          <motion.div
            className="relative mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {/* Outer rotating ring */}
            <motion.div
              className="absolute inset-0 w-24 h-24 border-4 border-green-primary/20 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Middle pulsing ring */}
            <motion.div
              className="absolute inset-2 w-20 h-20 border-2 border-green-primary/40 rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Inner spinning loader */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 flex items-center justify-center"
            >
              <Loader2 className="w-12 h-12 text-green-primary" />
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            جاري معالجة طلبك...
          </motion.h1>

          <motion.p
            className="text-gray-600 max-w-md text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            يرجى الانتظار بينما نقوم بتأكيد طلبك وإتمام عملية الدفع
          </motion.p>

          {/* Progress dots */}
          <motion.div
            className="flex gap-2 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-green-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </>
    );
  }

  // Error state with enhanced animations
  if (error) {
    return (
      <>
        <Breadcrumb
          items={[
            { label: "الرئيسية", href: "/" },
            { label: "المتجر", href: "/products" },
            { label: "تأكيد الطلب", href: "/checkout/success" },
          ]}
        />

        <motion.div
          className="flex flex-col items-center justify-center my-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              x: [0, -5, 5, -5, 5, 0],
            }}
            transition={{
              scale: { delay: 0.3, type: "spring", stiffness: 200 },
              rotate: { delay: 0.3, type: "spring", stiffness: 200 },
              x: { delay: 1, duration: 0.5 },
            }}
            className="mb-6 relative"
          >
            {/* Error pulse effect */}
            <motion.div
              className="absolute inset-0 w-20 h-20 bg-red-500/20 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <XCircle className="w-20 h-20 text-red-500 relative z-10" />
          </motion.div>

          <motion.h1
            className="text-2xl font-bold mb-4 text-red-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            فشل في عملية الدفع
          </motion.h1>

          <motion.p
            className="text-gray-600 mb-8 max-w-md text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            {error}
          </motion.p>

          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={handleContinueShopping}
                className="px-6 py-3 transition-all duration-200"
              >
                العودة للرئيسية
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleRetryPayment}
                className="px-6 py-3 transition-all duration-200"
              >
                إعادة المحاولة
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </>
    );
  }

  // Success state
  if (!orderResponse) {
    return null;
  }

  const { updatedOrder, paymentResponse, pointTransaction } = orderResponse;
  const orderDate = new Date(updatedOrder.createdAt).toLocaleDateString(
    "ar-SA",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المتجر", href: "/products" },
          { label: "تأكيد الطلب", href: "/checkout/success" },
        ]}
      />

      {/* Success Message with enhanced animations */}
      <motion.div
        className="flex flex-col items-center justify-center my-12 text-center relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Floating success particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-green-500 rounded-full"
              initial={{
                x: Math.random() * 600,
                y: Math.random() * 400,
                scale: 0,
              }}
              animate={{
                y: [null, -30, 10, -10, 0],
                scale: [0, 1, 0.5, 1, 0],
                opacity: [0, 1, 0.7, 0.3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <motion.h1
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.3,
            duration: 0.6,
            type: "spring",
            stiffness: 200,
          }}
        >
          تم تأكيد طلبك بنجاح!
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-8 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          شكراً للتسوق معنا! نحن نعمل على تجهيز طلبك ليصل إليك في أقرب وقت ممكن.
        </motion.p>

        {/* Enhanced success icon with custom SVG */}
        <motion.div
          className="relative mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.7,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
        >
          {/* Success glow effect */}
          <motion.div
            className="absolute inset-0 bg-green-500/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Custom success payment icon */}
          <motion.div
            animate={{
              y: [0, -5, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <Image
              src="/icons/success-payment.svg"
              alt="Payment Success"
              width={120}
              height={120}
              className="drop-shadow-lg"
            />
          </motion.div>
        </motion.div>

        {/* Enhanced points notification with gift icon */}
        <AnimatePresence>
          {pointTransaction && pointTransaction.pointsChanged > 0 && (
            <motion.div
              className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl shadow-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{
                delay: 1,
                duration: 0.6,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-20 h-20 bg-green-400 rounded-full -translate-y-10 translate-x-10" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-400 rounded-full translate-y-8 -translate-x-8" />
              </div>

              <div className="flex items-center gap-3 text-green-700 relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 1.3, type: "spring", stiffness: 300 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Image
                      src="/icons/gift.svg"
                      alt="Gift"
                      width={32}
                      height={32}
                    />
                  </motion.div>

                  {/* Gift sparkles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      style={{
                        top: `${20 + i * 10}%`,
                        right: `${10 + i * 15}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: 1.5 + i * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>

                <motion.span
                  className="font-bold text-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                >
                  تم إضافة {pointTransaction.pointsChanged} نقطة لحسابك!
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Enhanced Order Details */}
      <motion.div
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 mb-8 max-w-4xl mx-auto shadow-lg border border-gray-200 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -translate-y-16 translate-x-16 opacity-50" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50" />

        <div className="relative z-10">
          <motion.div
            className="flex flex-col gap-6 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            {/* Order Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <Package className="w-5 h-5 text-green-600" />
                  معلومات الطلب
                </h3>

                <div className="space-y-3">
                  <motion.div
                    className="flex justify-between py-2 px-3 bg-white rounded-lg shadow-sm border"
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <span className="font-medium text-gray-600 flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full" />
                      رقم الطلب
                    </span>
                    <span className="text-green-primary font-bold">
                      {updatedOrder.orderNumber}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between py-2 px-3 bg-white rounded-lg shadow-sm border"
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <span className="font-medium text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      تاريخ الطلب
                    </span>
                    <span className="text-green-primary font-bold">
                      {orderDate}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between py-2 px-3 bg-white rounded-lg shadow-sm border"
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <span className="font-medium text-gray-600">
                      حالة الطلب
                    </span>
                    <motion.span
                      className="text-green-primary font-bold px-3 py-1 bg-green-100 rounded-full text-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: 1.5,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      {updatedOrder.status === "PROCESSING"
                        ? "قيد المعالجة"
                        : updatedOrder.status}
                    </motion.span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between py-2 px-3 bg-white rounded-lg shadow-sm border"
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <span className="font-medium text-gray-600">
                      طريقة الدفع
                    </span>
                    <span className="text-green-primary font-bold">
                      <PaymentMethodIcon
                        company={paymentResponse.data.source.company}
                      />
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              {/* Delivery Information Section */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  معلومات التوصيل
                </h3>

                <div className="space-y-3">
                  <motion.div
                    className="flex justify-between py-2 px-3 bg-white rounded-lg shadow-sm border"
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <span className="font-medium text-gray-600 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      الاسم
                    </span>
                    <span className="text-green-primary font-bold">
                      {updatedOrder.orderAddress.fullname}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between py-2 px-3 bg-white rounded-lg shadow-sm border"
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <span className="font-medium text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      العنوان
                    </span>
                    <span className="text-green-primary font-bold text-right max-w-xs">
                      {`${updatedOrder.orderAddress.city} - ${updatedOrder.orderAddress.district} - ${updatedOrder.orderAddress.street} - ${updatedOrder.orderAddress.building}`}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between py-2 px-3 bg-white rounded-lg shadow-sm border"
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <span className="font-medium text-gray-600 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      رقم الجوال
                    </span>
                    <span className="text-green-primary font-bold" dir="ltr">
                      {updatedOrder.orderAddress.phoneNumber}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Order Items */}
          <motion.div
            className="mb-6 space-y-4 border-y border-gray-300 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <h3 className="font-bold text-lg text-gray-800 mb-4">
              المنتجات المطلوبة
            </h3>
            {updatedOrder.orderItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="relative size-16 rounded-lg overflow-hidden bg-gray-100 shadow-sm"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image
                      src={
                        item.variant.product.media?.[0]?.url ||
                        "/images/products/pantene-shampoo.png"
                      }
                      alt={
                        item.variant.product.arabicName ||
                        item.variant.product.name
                      }
                      fill
                      className="object-contain"
                    />
                  </motion.div>
                  <div>
                    <div className="flex flex-col">
                      <p className="text-gray-800 font-medium">
                        {item.variant.product.arabicName ||
                          item.variant.product.name}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {item.quantity} ×{" "}
                        {parseFloat(item.unitPrice).toFixed(2)} ر.س
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-green-primary font-bold text-lg">
                  {parseFloat(item.totalPrice).toFixed(2)} ر.س
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Order Summary */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <h3 className="font-bold text-lg text-gray-800 mb-4">ملخص الطلب</h3>
            <div className="space-y-3">
              <motion.div
                className="flex justify-between text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.5 }}
              >
                <span>المجموع الفرعي</span>
                <span className="font-medium text-green-primary">
                  {parseFloat(updatedOrder.subtotalBeforeFees).toFixed(2)} ر.س
                </span>
              </motion.div>

              <motion.div
                className="flex justify-between text-gray-600 pb-3 border-b border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                <span>خدمة التوصيل</span>
                <span className="font-medium text-green-primary">
                  {parseFloat(updatedOrder.deliveryFee).toFixed(2)} ر.س
                </span>
              </motion.div>

              <motion.div
                className="flex justify-between font-bold text-lg pt-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.9,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <span>الإجمالي</span>
                <span className="text-green-primary text-xl">
                  {parseFloat(updatedOrder.totalPriceAfterFees).toFixed(2)} ر.س
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Action Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            className="px-8 py-6 text-base font-bold bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            variant="default"
            onClick={handleContinueShopping}
          >
            متابعة التسوق
          </Button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CheckoutSuccessPage;
