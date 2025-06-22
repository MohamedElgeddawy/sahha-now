"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const iconVariants: Variants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    wiggle: {
      rotate: [0, 5, -5, 5, 0],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 3,
        ease: "easeInOut",
      },
    },
  };

  const exclamationVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.3, duration: 0.3 },
    },
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        repeat: Infinity,
        duration: 1.5,
      },
    },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.9,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: { scale: 0.95 },
  };

  const dotVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    bounce: {
      y: [0, -15, 0],
      opacity: [0.5, 1, 0.5],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Error Icon */}
      <div className="flex items-center justify-center mb-12">
        <motion.div
          className="relative"
          variants={iconVariants}
          animate={["visible", "wiggle"]}
        >
          <div className="relative">
            <AlertTriangle
              className="text-red-500 h-24 w-24"
              strokeWidth={1.5}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-white"
              variants={exclamationVariants}
              animate={["visible", "pulse"]}
            >
              !
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Error message */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-[#2C3E50] mb-4"
        variants={itemVariants}
      >
        عذراً، حدث خطأ ما
      </motion.h1>

      <motion.p
        className="text-gray-500 text-center max-w-md mb-8"
        variants={itemVariants}
      >
        نعتذر عن هذا الخطأ. يرجى المحاولة مرة أخرى أو العودة إلى الصفحة
        الرئيسية.
      </motion.p>

      {/* Error details for development only */}
      {process.env.NODE_ENV === "development" && (
        <motion.div
          className="bg-gray-100 p-4 rounded-lg mb-8 max-w-md w-full overflow-auto"
          variants={itemVariants}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p className="text-red-600 font-mono text-sm">
            {error.message || "An unknown error occurred"}
          </p>
        </motion.div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-16">
        <motion.div
          className="flex-1"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            onClick={() => reset()}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-lg"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            إعادة المحاولة
          </Button>
        </motion.div>

        <motion.div
          className="flex-1"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            asChild
            variant="outline"
            className="w-full border-green-600 text-green-600 hover:bg-green-50 h-12 rounded-lg"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              العودة للرئيسية
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Animated dots */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="h-3 w-3 mx-1 rounded-full bg-green-500"
            variants={dotVariants}
            animate="bounce"
            custom={i}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </motion.div>

      {/* Background decoration */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-red-100 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 10, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-red-200 opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
