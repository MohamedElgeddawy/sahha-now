"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useCart } from "@/lib/hooks/use-cart";
import { useRouter } from "next/navigation";

const CheckoutSuccessPage = () => {
  const router = useRouter();
  const { items, subtotal, emptyCart } = useCart();
  const [orderDetails] = useState({
    orderNumber: "1202101",
    orderDate: new Date().toLocaleDateString("ar-SA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    paymentMethod: "نقداً",
    customerName: "أحمد خالد",
    address: "الرياض - حي الفيصل - شارع الأمير - مبنى 22 - شقة 5",
    phoneNumber: "05XXXXXXXX",
  });

  // Calculate shipping cost
  const shippingCost = 16.32;

  // Calculate total
  const total = subtotal + shippingCost;

  // Effect to clear cart after successful order
  useEffect(() => {
    // If there are no items and we've not been redirected here through normal flow,
    // redirect to the home page
    if (items.length === 0) {
      // In a real app, you'd check if this is a fresh visit vs. after checkout
      // For now, we'll use a timeout to simulate checking the order status
      const timer = setTimeout(() => {
        router.push("/");
      }, 5000);
      return () => clearTimeout(timer);
    }

    return () => {
      // Clear cart when component unmounts
      // In a real app, you'd only do this after confirming the order is processed
      //   emptyCart();
    };
  }, [items.length, router]);

  const handleContinueShopping = () => {
    // Clear the cart when the user clicks continue shopping
    emptyCart();
    router.push("/");
  };

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

      {/* Success Message */}
      <motion.div
        className="flex flex-col items-center justify-center my-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          تم تأكيد طلبك بنجاح!
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-8 max-w-2xl text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          شكراً للتسوق معنا! نحن نعمل على تجهيز طلبك ليصل إليك في أقرب وقت ممكن.
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
        >
          <Image
            src="/icons/success-payment.svg"
            alt="تم تأكيد الطلب"
            width={140}
            height={140}
          />
        </motion.div>
      </motion.div>

      {/* Order Details */}
      <motion.div
        className="bg-[#F6F6F6] rounded-lg p-8 mb-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="flex flex-col gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex justify-between py-2">
              <span className="font-medium text-gray-600">رقم الطلب</span>
              <span className="text-green-primary">
                {orderDetails.orderNumber}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium text-gray-600">تاريخ الطلب</span>
              <span className="text-green-primary">
                {orderDetails.orderDate}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium text-gray-600">طريقة الدفع</span>
              <span className="text-green-primary">
                {orderDetails.paymentMethod}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between py-2">
              <span className="font-medium text-gray-600">الاسم</span>
              <span className="text-green-primary">
                {orderDetails.customerName}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium text-gray-600">العنوان</span>
              <span className="text-green-primary">{orderDetails.address}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium text-gray-600">رقم الجوال</span>
              <span className="text-green-primary" dir="ltr">
                {orderDetails.phoneNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-4 space-y-4 border-y border-gray-300 py-2">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-center gap-2">
                <div className="relative size-16 rounded-md overflow-hidden">
                  <Image
                    src={
                      item.product.media?.[0]?.url ||
                      "/images/products/pantene-shampoo.png"
                    }
                    alt={item.product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <div className="flex flex-col">
                    <p className="text-gray-800">{item.product.name}</p>
                    <p className="text-gray-800 text-sm whitespace-nowrap">
                      {item.quantity} ×{" "}
                      {parseFloat(item.product.price).toFixed(2)} ر.س
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Order Summary */}
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className="flex justify-between text-gray-600">
            <span>المجموع الفرعي</span>
            <span className="font-medium text-green-primary">
              {subtotal.toFixed(2)} ر.س
            </span>
          </div>
          <div className="flex justify-between text-gray-600 pb-2 border-b border-gray-300">
            <span>خدمة التوصيل</span>
            <span className="font-medium text-green-primary ">
              {shippingCost.toFixed(2)} ر.س
            </span>
          </div>
          <div className="flex justify-between font-bold">
            <span>الإجمالي</span>
            <span className="text-green-primary">{total.toFixed(2)} ر.س</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Action Button */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <Button
          className="px-8 py-6 text-base"
          variant="default"
          onClick={handleContinueShopping}
        >
          متابعة التسوق
        </Button>
      </motion.div>
    </>
  );
};

export default CheckoutSuccessPage;
