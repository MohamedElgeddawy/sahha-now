"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityCounterProps {
  initialValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const QuantityCounter: React.FC<QuantityCounterProps> = ({
  initialValue = 1,
  min = 0,
  max = 99,
  onChange,
  className = "",
  size = "lg",
}) => {
  const [count, setCount] = useState(initialValue);
  const [isIncrementing, setIsIncrementing] = useState(true);
  const prevCountRef = useRef(initialValue);

  useEffect(() => {
    setCount(initialValue);
  }, [initialValue]);

  // Format number with leading zero
  const formatCount = (value: number): string => {
    return value.toString().padStart(2, "0");
  };

  // Split count into individual digits for animation
  const countString = formatCount(count);
  const prevCountString = formatCount(prevCountRef.current);
  const digits = countString.split("");

  // Handle increment
  const increment = () => {
    if (count < max) {
      setIsIncrementing(true);
      prevCountRef.current = count;
      const newValue = count + 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  // Handle decrement
  const decrement = () => {
    if (count > min) {
      setIsIncrementing(false);
      prevCountRef.current = count;
      const newValue = count - 1;
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  // Ensure count is within bounds when min/max props change
  useEffect(() => {
    let newValue = count;
    if (count < min) newValue = min;
    if (count > max) newValue = max;

    if (newValue !== count) {
      prevCountRef.current = count;
      setCount(newValue);
      onChange?.(newValue);
    }
  }, [min, max, count]);

  // Animation variants
  const containerVariants: Variants = {
    hover: {
      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
    },
  };

  // Different animation variants for incrementing and decrementing
  const incrementVariants: Variants = {
    initial: {
      y: -20,
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
    exit: {
      y: 20,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.15,
      },
    },
  };

  const decrementVariants: Variants = {
    initial: {
      y: 20,
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.15,
      },
    },
  };

  const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
    disabled: { opacity: 0.5, scale: 1 },
  };

  // Check which digits have changed
  const hasDigitChanged = (index: number) => {
    return countString[index] !== prevCountString[index];
  };

  return (
    <motion.div
      className={cn(
        `flex items-center justify-between bg-gray-100 rounded-lg shadow-sm px-3 py-2`,
        className,
        {
          "h-8": size === "sm",
          "h-10": size === "md",
          "h-12": size === "lg",
        }
      )}
      variants={containerVariants}
      whileHover="hover"
    >
      <motion.button
        className="text-gray-800 cursor-pointer text-xl font-medium size-8 flex items-center justify-center focus:outline-none"
        onClick={decrement}
        variants={buttonVariants}
        whileHover={count > min ? "hover" : "disabled"}
        whileTap={count > min ? "tap" : "disabled"}
        disabled={count <= min}
        animate={count <= min ? "disabled" : "initial"}
        aria-label="Decrease quantity"
      >
        <Minus />
      </motion.button>

      <div className="flex items-center justify-center w-12 h-9 overflow-hidden">
        <div className="flex" dir="ltr">
          {digits.map((digit, index) => {
            const key = `${countString}-${index}`;
            const shouldAnimate = hasDigitChanged(index);

            // If the digit hasn't changed, render it without animation
            if (!shouldAnimate) {
              return (
                <span
                  key={key}
                  className="text-gray-900 font-bold text-xl block"
                >
                  {digit}
                </span>
              );
            }

            // Otherwise, animate the digit
            return (
              <AnimatePresence mode="popLayout" key={index}>
                <motion.span
                  key={key}
                  className="text-gray-900 font-bold text-xl block"
                  variants={
                    isIncrementing ? incrementVariants : decrementVariants
                  }
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {digit}
                </motion.span>
              </AnimatePresence>
            );
          })}
        </div>
      </div>

      <motion.button
        className="text-gray-800 cursor-pointer text-xl font-medium size-8 flex items-center justify-center focus:outline-none"
        onClick={increment}
        variants={buttonVariants}
        whileHover={count < max ? "hover" : "disabled"}
        whileTap={count < max ? "tap" : "disabled"}
        disabled={count >= max}
        animate={count >= max ? "disabled" : "initial"}
        aria-label="Increase quantity"
      >
        <Plus />
      </motion.button>
    </motion.div>
  );
};

export default QuantityCounter;
