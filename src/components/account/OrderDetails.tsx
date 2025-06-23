"use client";

import React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
};

type OrderDetailsProps = {
  orderId?: string;
};

export function OrderDetails({ orderId }: OrderDetailsProps) {
  // In a real app, you would fetch order details based on orderId
  const orderDetails = {
    id: "1202101",
    date: "الأربعاء 12 ديسمبر 2023",
    status: "تم التوصيل", // Could be "قيد التجهيز", "تم الشحن", "تم التوصيل"
    paymentMethod: "نقداً",
    address: "الرياض - حي الفيصل - شارع الأمير - مبنى 22 - شقة 5",
    phone: "05XXXXXXXX",
    items: [
      {
        id: "1",
        name: "بلسم أدفانس اللون متعدد ستايل",
        quantity: 1,
        price: 48.51,
        image: "/images/products/pantene-shampoo.png",
      },
      {
        id: "2",
        name: "فيتامينات جاميسون متعددة",
        quantity: 2,
        price: 125.0,
        image: "/images/products/jamieson-multivitamins.png",
      },
      {
        id: "3",
        name: "توصيل مناديل استخدام مرة للوجه",
        quantity: 1,
        price: 30.51,
        image: "/images/products/baby-joy-diapers.png",
      },
    ],
    subtotal: 329.02,
    shipping: 16.32,
    total: 314.83,
    points: 350,
  };

  // Calculate progress step based on status
  const getProgressStep = () => {
    switch (orderDetails.status) {
      case "قيد التجهيز":
        return 1;
      case "تم الشحن":
        return 2;
      case "تم التوصيل":
        return 3;
      default:
        return 1;
    }
  };

  const progressStep = getProgressStep();

  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-200 shadow overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Progress Stepper */}
      <div className="p-6 pb-0">
        <div className="flex justify-between items-center my-8">
          <motion.div
            className="flex items-center flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center
              ${progressStep >= 3 ? "bg-green-500" : "bg-gray-200"}`}
            >
              <CheckCircle2
                className={progressStep >= 3 ? "text-white" : "text-gray-400"}
              />
            </div>
            <span
              className={`mt-2 text-sm ${
                progressStep >= 3
                  ? "text-green-500 font-medium"
                  : "text-gray-500"
              }`}
            >
              تم التوصيل
            </span>
          </motion.div>

          <div
            className={`h-1 flex-1 mx-2 ${
              progressStep >= 2 ? "bg-green-500" : "bg-gray-200"
            }`}
          ></div>

          <motion.div
            className="flex items-center flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center
              ${progressStep >= 2 ? "bg-green-500" : "bg-gray-200"}`}
            >
              <CheckCircle2
                className={progressStep >= 2 ? "text-white" : "text-gray-400"}
              />
            </div>
            <span
              className={`mt-2 text-sm ${
                progressStep >= 2
                  ? "text-green-500 font-medium"
                  : "text-gray-500"
              }`}
            >
              تم الشحن
            </span>
          </motion.div>

          <div
            className={`h-1 flex-1 mx-2 ${
              progressStep >= 1 ? "bg-green-500" : "bg-gray-200"
            }`}
          ></div>

          <motion.div
            className="flex items-center flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center
              ${progressStep >= 1 ? "bg-green-500" : "bg-gray-200"}`}
            >
              <CheckCircle2
                className={progressStep >= 1 ? "text-white" : "text-gray-400"}
              />
            </div>
            <span
              className={`mt-2 text-sm ${
                progressStep >= 1
                  ? "text-green-500 font-medium"
                  : "text-gray-500"
              }`}
            >
              قيد التجهيز
            </span>
          </motion.div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 p-6">
        {/* Order Info Column */}
        <motion.div
          className="space-y-4 bg-gray-50 p-4 rounded-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 text-right">
              معلومات الطلب
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between py-2">
                <span className="text-gray-900 font-medium">
                  {orderDetails.id}
                </span>
                <span className="text-gray-600">رقم الطلب</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-900">{orderDetails.date}</span>
                <span className="text-gray-600">تاريخ الطلب</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-900">
                  {orderDetails.paymentMethod}
                </span>
                <span className="text-gray-600">طريقة الدفع</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-900">{orderDetails.address}</span>
                <span className="text-gray-600">العنوان</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-900" dir="ltr">
                  {orderDetails.phone}
                </span>
                <span className="text-gray-600">رقم الجوال</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order Summary Column */}
        <motion.div
          className="space-y-2 bg-gray-50 p-4 rounded-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <h3 className="font-bold text-lg mb-4 text-gray-800 text-right">
              ملخص الطلب
            </h3>
            <div className="space-y-2 text-right">
              <div className="flex justify-between">
                <span className="text-gray-900">
                  {orderDetails.subtotal.toFixed(2)} ر.س
                </span>
                <span className="text-gray-600">المجموع الفرعي</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-900">
                  {orderDetails.shipping.toFixed(2)} ر.س
                </span>
                <span className="text-gray-600">خدمة التوصيل</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-bold text-green-600">
                  {orderDetails.total.toFixed(2)} ر.س
                </span>
                <span className="font-bold">الإجمالي</span>
              </div>

              {orderDetails.points > 0 && (
                <div className="flex justify-between mt-4 pt-2 border-t">
                  <span className="font-bold text-green-600">
                    {orderDetails.points} نقطة
                  </span>
                  <span className="font-bold">النقاط المكتسبة</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Order Products */}
      <div className="p-6 border-t border-gray-200">
        <h3 className="font-bold text-lg mb-4 text-gray-800 text-right">
          المنتجات
        </h3>
        <div className="space-y-4">
          {orderDetails.items.map((item, index) => (
            <motion.div
              key={item.id}
              className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0 last:pb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-gray-600">
                    {item.quantity} × {item.price.toFixed(2)} ر.س
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-right">{item.name}</h4>
                </div>
                <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
