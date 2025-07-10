"use client";

import React from "react";
import { Breadcrumb } from "@components/layout/Breadcrumb";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export const LoadingOrderDetails = () => {
  // Enhanced loading animation with floating particles
  const LoadingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(8)].map((_, i) => (
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
          جاري تحميل تفاصيل الطلب...
        </motion.h1>

        <motion.p
          className="text-gray-600 max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          يرجى الانتظار بينما نقوم بجلب معلومات طلبك
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
};
