"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@components/layout/Breadcrumb";
import { Button } from "@components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import {
  CreditCard,
  MapPin,
  User,
  Phone,
  Calendar,
  Package,
} from "lucide-react";
import { Order } from "@api/orders";

interface OrderDetailsProps {
  order?: Order;
}

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

export const CheckoutOrderDetails = ({ order }: OrderDetailsProps) => {
  const router = useRouter();

  const orderDate = new Date(order?.createdAt || "").toLocaleDateString(
    "ar-SA",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleContinueShopping = () => {
    router.push("/");
  };

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المتجر", href: "/products" },
          { label: "تفاصيل الطلب" },
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
          {order?.pointsEarned && Number(order?.pointsEarned) > 0 && (
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
                  تم إضافة {order?.pointsEarned} نقطة لحسابك!
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
                      {order?.orderNumber}
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
                      {order?.status === "PENDING"
                        ? "قيد الانتظار"
                        : order?.status === "CONFIRMED"
                        ? "مؤكد"
                        : order?.status === "SHIPPED"
                        ? "تم الشحن"
                        : order?.status === "DELIVERED"
                        ? "تم التوصيل"
                        : order?.status === "CANCELLED"
                        ? "ملغي"
                        : order?.status === "RETURNED"
                        ? "مُرجع"
                        : order?.status}
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
                      {/* <PaymentMethodIcon
                        company={order?.}
                      /> */}
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
                      {order?.orderAddress.fullname}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between py-2 px-3 bg-white rounded-lg shadow-sm border"
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <span className="font-medium text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      المدينة
                    </span>
                    <span className="text-green-primary font-bold">
                      {order?.orderAddress.city}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between py-2 px-3 bg-white rounded-lg shadow-sm border"
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <span className="font-medium text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      الحي
                    </span>
                    <span className="text-green-primary font-bold">
                      {order?.orderAddress.district}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between py-2 px-3 bg-white rounded-lg shadow-sm border"
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <span className="font-medium text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      الشارع
                    </span>
                    <span className="text-green-primary font-bold">
                      {order?.orderAddress.street}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex justify-between py-2 px-3 bg-white rounded-lg shadow-sm border"
                    whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                  >
                    <span className="font-medium text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      المبنى
                    </span>
                    <span className="text-green-primary font-bold">
                      {order?.orderAddress.building}
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
                      {order?.orderAddress.phoneNumber}
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
            {order?.orderItems.map((item, index) => (
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
                      src={item.variant.product.media?.[0]?.thumbnailUrl}
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
                        {item.variant.arabicName || item.variant.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-gray-600 text-sm">
                          {item.quantity} ×{" "}
                          {parseFloat(item.unitPrice).toFixed(2)} ر.س
                        </p>
                        {parseFloat(item.variant.discount) > 0 && (
                          <div className="flex items-center gap-1">
                            <span className="text-red-500 text-xs line-through">
                              {parseFloat(item.variant.price).toFixed(2)} ر.س
                            </span>
                            <span className="text-green-500 text-xs font-medium">
                              -{parseFloat(item.variant.discount).toFixed(2)}{" "}
                              ر.س
                            </span>
                          </div>
                        )}
                      </div>
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
              {/* Calculate total discount */}
              {(() => {
                const totalDiscount =
                  order?.orderItems.reduce((sum, item) => {
                    return (
                      sum + parseFloat(item.variant.discount) * item.quantity
                    );
                  }, 0) || 0;

                return totalDiscount > 0 ? (
                  <motion.div
                    className="flex justify-between text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                  >
                    <span>إجمالي الخصم</span>
                    <span className="font-medium text-red-500">
                      -{totalDiscount.toFixed(2)} ر.س
                    </span>
                  </motion.div>
                ) : null;
              })()}

              <motion.div
                className="flex justify-between text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.7, duration: 0.5 }}
              >
                <span>المجموع الفرعي</span>
                <span className="font-medium text-green-primary">
                  {parseFloat(order?.subtotalBeforeFees || "0").toFixed(2)} ر.س
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
                  {parseFloat(order?.deliveryFee || "0").toFixed(2)} ر.س
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
                  {parseFloat(order?.totalPriceAfterFees || "0").toFixed(2)} ر.س
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
