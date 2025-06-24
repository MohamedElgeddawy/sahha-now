"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Home, ArrowRight } from "lucide-react";
import { motion, Variants } from "motion/react";

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

  const dotVariants: Variants = {
    jump: {
      y: -30,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16"
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
      <div className="flex flex-col *:flex-1 sm:flex-row gap-4 w-full max-w-md mb-16">
        <Button
          asChild
          className="bg-green-600 hover:bg-green-700 text-white h-12 rounded-lg"
        >
          <Link href="/">
            <Home className="mr-2 h-5 w-5" />
            العودة للرئيسية
          </Link>
        </Button>

        <Button
          asChild
          variant="outline"
          className="border-green-primary text-green-primary hover:bg-green-primary/10 h-12 rounded-lg"
        >
          <Link href="/products">
            تصفح المنتجات
            <ArrowRight className="size-5 rtl:rotate-180" />
          </Link>
        </Button>
      </div>

      {/* Animated dots */}
      <motion.div
        animate="jump"
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
        className="flex justify-center gap-2"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="size-4 will-change-transform rounded-full bg-green-500"
            variants={dotVariants}
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
