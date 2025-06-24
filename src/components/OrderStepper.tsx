"use client";

import React from "react";
import { motion, Variants } from "motion/react";
import {
  CheckIcon,
  ClockIcon,
  PackageIcon,
  TruckIcon,
  HomeIcon,
  CircleIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Enhanced step interface
export interface OrderStep {
  id: number;
  title: string;
  description: string;
  timestamp?: string;
  icon: React.ComponentType<any>;
  status: "completed" | "current" | "pending";
}

export interface OrderStepperProps {
  currentStatus: string;
  className?: string;
}

// Animation variants
const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 * i,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

// Progress line variants
const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      delay: 0.3,
    },
  },
};

// Step icon animation
const iconVariants: Variants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

// Pulse animation for current step
const pulseVariants: Variants = {
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function OrderStepper({ currentStatus, className }: OrderStepperProps) {
  // Enhanced step configuration with detailed information
  const getOrderSteps = (): OrderStep[] => {
    const currentStep = (() => {
      switch (currentStatus) {
        case "قيد التجهيز":
          return 1;
        case "تم الشحن":
          return 2;
        case "تم التوصيل":
          return 3;
        default:
          return 1;
      }
    })();

    return [
      {
        id: 1,
        title: "قيد التجهيز",
        description: "يتم تجهيز طلبك وتعبئته",
        timestamp: "12:30 PM - 12 ديسمبر",
        icon: PackageIcon,
        status:
          currentStep > 1
            ? "completed"
            : currentStep === 1
            ? "current"
            : "pending",
      },
      {
        id: 2,
        title: "تم الشحن",
        description: "طلبك في الطريق إليك",
        timestamp: currentStep >= 2 ? "02:15 PM - 12 ديسمبر" : undefined,
        icon: TruckIcon,
        status:
          currentStep > 2
            ? "completed"
            : currentStep === 2
            ? "current"
            : "pending",
      },
      {
        id: 3,
        title: "تم التوصيل",
        description: "وصل طلبك بنجاح",
        timestamp: currentStep >= 3 ? "05:45 PM - 12 ديسمبر" : undefined,
        icon: HomeIcon,
        status:
          currentStep > 3
            ? "completed"
            : currentStep === 3
            ? "current"
            : "pending",
      },
    ];
  };

  const steps = getOrderSteps();

  // Calculate progress for line filling
  const getProgressPercentage = () => {
    const completedSteps = steps.filter(
      (step) => step.status === "completed"
    ).length;
    const currentStepIndex = steps.findIndex(
      (step) => step.status === "current"
    );

    if (currentStepIndex !== -1) {
      // If there's a current step, progress includes completed steps plus current step position
      return (currentStepIndex / (steps.length - 1)) * 100;
    } else if (completedSteps > 0) {
      // If no current step but there are completed steps
      return (completedSteps / (steps.length - 1)) * 100;
    }
    return 0;
  };

  const progressPercentage = getProgressPercentage();

  return (
    <div className={cn("max-w-4xl mx-auto mb-12", className)}>
      <div className="relative">
        {/* Steps Container */}
        <div className="flex justify-between items-start relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center z-10 flex-1"
              custom={index}
              variants={fadeInVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Step Circle with Icon */}
              <motion.div
                className={cn(
                  "relative size-16 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                  {
                    "bg-green-500 border-green-500 shadow-lg shadow-green-500/30":
                      step.status === "completed",
                    "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/30":
                      step.status === "current",
                    "bg-gray-100 border-gray-300": step.status === "pending",
                  }
                )}
                variants={step.status === "current" ? pulseVariants : undefined}
                animate={step.status === "current" ? "pulse" : undefined}
              >
                <motion.div
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.2 * index }}
                >
                  {step.status === "completed" ? (
                    <CheckIcon className="w-8 h-8 text-white" />
                  ) : step.status === "current" ? (
                    <step.icon className="w-8 h-8 text-white" />
                  ) : (
                    <CircleIcon className="w-6 h-6 text-gray-400 fill-current" />
                  )}
                </motion.div>

                {/* Animated ring for current step */}
                {step.status === "current" && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-blue-300"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 0, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
              </motion.div>

              {/* Step Content */}
              <div className="mt-4 text-center max-w-32">
                <motion.h3
                  className={cn("text-sm font-bold mb-1", {
                    "text-green-600": step.status === "completed",
                    "text-blue-600": step.status === "current",
                    "text-gray-500": step.status === "pending",
                  })}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 * index }}
                >
                  {step.title}
                </motion.h3>

                <motion.p
                  className="text-xs text-gray-600 mb-2 leading-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 * index }}
                >
                  {step.description}
                </motion.p>

                {step.timestamp && (
                  <motion.div
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs",
                      {
                        "bg-green-50 text-green-700":
                          step.status === "completed",
                        "bg-blue-50 text-blue-700": step.status === "current",
                        "bg-gray-50 text-gray-700": step.status === "pending",
                      }
                    )}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 * index }}
                  >
                    <ClockIcon className="w-3 h-3" />
                    <span>{step.timestamp}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Lines - Properly positioned */}
        <div className="absolute rtl:rotate-180 top-8 left-1/6 right-1/6 h-1 -z-0">
          <div className="relative w-full h-full">
            {/* Background line */}
            <div className="absolute inset-0 bg-gray-200 rounded-full"></div>

            {/* Progress line */}
            {progressPercentage > 0 && (
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full"
                style={{
                  width: `${progressPercentage}%`,
                }}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
              />
            )}
          </div>
        </div>
      </div>

      {/* Order Status Badge */}
      <motion.div
        className="flex justify-center mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Badge
          variant="outline"
          className={cn("text-sm px-4 py-2 font-medium", {
            "border-green-500 text-green-700 bg-green-50":
              currentStatus === "تم التوصيل",
            "border-blue-500 text-blue-700 bg-blue-50":
              currentStatus === "تم الشحن",
            "border-orange-500 text-orange-700 bg-orange-50":
              currentStatus === "قيد التجهيز",
          })}
        >
          حالة الطلب: {currentStatus}
        </Badge>
      </motion.div>
    </div>
  );
}
