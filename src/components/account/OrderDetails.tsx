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
        name: "لوشن مناديل استخدام مرة للوجه",
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

  return (
    <motion.div
      className="bg-white rounded-lg p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Order ID and Title */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h2 className="text-xl font-bold">طلب #{orderDetails.id}</h2>
        <div className="text-gray-500 text-sm">{orderDetails.date}</div>
      </div>

      {/* Order Status Stepper */}
      <OrderStepper currentStatus={orderDetails.status} />

      {/* Order Details */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="col-span-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">المنتج</TableHead>
                <TableHead className="text-center">السعر</TableHead>
                <TableHead className="text-center">الكمية</TableHead>
                <TableHead className="text-left">الإجمالي</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderDetails.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="">
                    <div className="flex items-center justify-start gap-3">
                      <div className="relative size-14 bg-gray-100 rounded-md overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.price.toFixed(2)} ر.س
                  </TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-left font-medium">
                    {(item.quantity * item.price).toFixed(2)} ر.س
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between gap-2">
            <span className=" font-medium">رقم الطلب</span>
            <span className="text-gray-700">{orderDetails.id}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className=" font-medium">تاريخ الطلب</span>
            <span className="text-gray-700">{orderDetails.date}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className=" font-medium">طريقة الدفع</span>
            <span className="text-gray-700">{orderDetails.paymentMethod}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className=" font-medium">العنوان</span>
            <span className="text-gray-700">{orderDetails.address}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className=" font-medium">رقم الجوال</span>
            <span className="text-gray-700" dir="ltr">
              {orderDetails.phone}
            </span>
          </div>

          <div className="flex justify-between gap-2">
            <span className=" font-medium">المجموع الفرعي</span>
            <span className="text-gray-700">
              {orderDetails.subtotal.toFixed(2)} ر.س
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className=" font-medium">خدمة التوصيل</span>
            <span className="text-gray-700">
              {orderDetails.shipping.toFixed(2)} ر.س
            </span>
          </div>
          <div className="flex justify-between gap-2 border-t pt-4 border-gray-300">
            <span className=" font-bold">الإجمالي</span>
            <span className="font-bold text-green-600">
              {orderDetails.total.toFixed(2)} ر.س
            </span>
          </div>
          {orderDetails.points > 0 && (
            <div className="flex justify-between gap-2">
              <span className=" font-bold">النقاط المكتسبة</span>
              <span className="font-bold text-green-600">
                {orderDetails.points} نقطة
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
