"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Home, ArrowRight } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function NotFound() {
  // Animation for the numbers

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

  const fourLeftVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  const fourRightVariants: Variants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.4,
      },
    },
  };

  const searchIconVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.3,
      },
    },
    wiggle: {
      rotate: [0, 10, -10, 10, 0],
      transition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "easeInOut",
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

  const dotsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 1.2,
      },
    },
  };

  const dotVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
      delay: custom * 0.2,
    }),
    bounce: (custom: number) => ({
      y: [0, -15, 0],
      opacity: [0.5, 1, 0.5],
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "easeInOut",
      },
      delay: custom * 0.2,
    }),
  };

  return (
    <motion.div
      className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated 404 */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center">
          <motion.div
            className="text-8xl font-bold text-green-600"
            variants={fourLeftVariants}
          >
            4
          </motion.div>
          <motion.div
            className="relative mx-2"
            variants={searchIconVariants}
            animate={["visible", "wiggle"]}
          >
            <Search className="text-gray-400 h-20 w-20" strokeWidth={1.5} />
          </motion.div>
          <motion.div
            className="text-8xl font-bold text-green-600"
            variants={fourRightVariants}
          >
            4
          </motion.div>
        </div>
      </div>

      {/* Error message */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center text-[#2C3E50] mb-4"
        variants={itemVariants}
      >
        عذراً، الصفحة غير موجودة
      </motion.h1>

      <motion.p
        className="text-gray-500 text-center max-w-md mb-10"
        variants={itemVariants}
      >
        لم نتمكن من العثور على الصفحة التي تبحث عنها. قد تكون الصفحة قد انتقلت
        أو تم حذفها أو ربما لم تكن موجودة من البداية.
      </motion.p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mb-16">
        <motion.div
          className="flex-1"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <Button
            asChild
            className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-lg"
          >
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              العودة للرئيسية
            </Link>
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
            <Link href="/products">
              تصفح المنتجات
              <ArrowRight className="mr-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Animated dots */}
      <motion.div
        className="flex justify-center"
        variants={dotsContainerVariants}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="h-3 w-3 mx-1 rounded-full bg-green-500"
            variants={dotVariants}
            animate="bounce"
            custom={i}
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
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-green-100 opacity-20"
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
          className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-green-200 opacity-20"
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
