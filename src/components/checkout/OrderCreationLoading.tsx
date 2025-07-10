"use client";

import React from "react";
import { Breadcrumb } from "@components/layout/Breadcrumb";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export const OrderCreationLoading = () => {
  // Enhanced loading animation with floating particles
  const LoadingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-green-primary/20 rounded-full"
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
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "المتجر", href: "/products" },
          { label: "تأكيد الطلب" },
        ]}
      />

      <motion.div
        className="flex flex-col items-center justify-center my-12 text-center relative min-h-[500px]"
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
            className="absolute inset-0 w-32 h-32 border-4 border-green-primary/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />

          {/* Middle pulsing ring */}
          <motion.div
            className="absolute inset-4 w-24 h-24 border-2 border-green-primary/40 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Inner spinning loader */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 flex items-center justify-center"
          >
            <Loader2 className="w-16 h-16 text-green-primary" />
          </motion.div>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          جاري معالجة طلبك...
        </motion.h1>

        <motion.p
          className="text-gray-600 max-w-lg text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          يرجى الانتظار بينما نقوم بتأكيد طلبك وإتمام عملية الدفع
        </motion.p>

        {/* Enhanced progress steps */}
        <motion.div
          className="space-y-4 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {[
            { step: "التحقق من المنتجات", status: "completed" },
            { step: "معالجة الدفع", status: "processing" },
            // { step: "إنشاء الطلب", status: "processing" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
            >
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.status === "completed"
                    ? "bg-green-500"
                    : item.status === "processing"
                    ? "bg-blue-500"
                    : "bg-gray-300"
                }`}
                animate={
                  item.status === "processing" ? { scale: [1, 1.1, 1] } : {}
                }
                transition={
                  item.status === "processing"
                    ? { duration: 1.5, repeat: Infinity }
                    : {}
                }
              >
                {item.status === "completed" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 + index * 0.3 }}
                    className="text-white text-sm font-bold"
                  >
                    ✓
                  </motion.div>
                ) : item.status === "processing" ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <div className="text-gray-600 text-sm font-bold">
                    {index + 1}
                  </div>
                )}
              </motion.div>
              <span className="font-medium text-gray-700">{item.step}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress dots */}
        <motion.div
          className="flex gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-green-primary rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.4,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};
