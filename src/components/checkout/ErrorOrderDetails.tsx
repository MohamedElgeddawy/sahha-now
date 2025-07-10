"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@components/layout/Breadcrumb";
import { Button } from "@components/ui/button";
import { motion } from "motion/react";
import { XCircle } from "lucide-react";

interface ErrorOrderDetailsProps {
  error: any;
}

export const ErrorOrderDetails = ({ error }: ErrorOrderDetailsProps) => {
  const router = useRouter();

  const handleContinueShopping = () => {
    router.push("/");
  };

  const handleRetry = () => {
    router.refresh();
  };

  const errorMessage =
    error?.response?.data?.message || "حدث خطأ أثناء تحميل تفاصيل الطلب";

  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المتجر", href: "/products" },
          { label: "تفاصيل الطلب" },
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
          فشل في تحميل تفاصيل الطلب
        </motion.h1>

        <motion.p
          className="text-gray-600 mb-8 max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          {errorMessage}
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
              onClick={handleRetry}
              className="px-6 py-3 transition-all duration-200"
            >
              إعادة المحاولة
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};
