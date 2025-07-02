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
  currentStatus:
    | "PENDING"
    | "CONFIRMED"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURNED";
  className?: string;
  orderDate?: string;
  confirmedAt?: string;
  deliveredAt?: string;
  cancelledAt?: string;
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

export function OrderStepper({
  currentStatus,
  className,
  orderDate,
  confirmedAt,
  deliveredAt,
  cancelledAt,
}: OrderStepperProps) {
  // Format timestamp for Arabic locale
  const formatTimestamp = (dateString?: string) => {
    if (!dateString) return undefined;
    return new Date(dateString).toLocaleString("ar-SA", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Status mapping from English to Arabic
  const getStatusInArabic = (status: typeof currentStatus): string => {
    switch (status) {
      case "PENDING":
        return "قيد الانتظار";
      case "CONFIRMED":
        return "تم التأكيد";
      case "SHIPPED":
        return "تم الشحن";
      case "DELIVERED":
        return "تم التوصيل";
      case "CANCELLED":
        return "تم الإلغاء";
      case "RETURNED":
        return "تم الإرجاع";
      default:
        return status;
    }
  };

  // Enhanced step configuration with detailed information
  const getOrderSteps = (): OrderStep[] => {
    // Handle special cases for cancelled/returned orders
    if (currentStatus === "CANCELLED") {
      return [
        {
          id: 1,
          title: "تم إلغاء الطلب",
          description: "تم إلغاء طلبك",
          timestamp: formatTimestamp(cancelledAt || orderDate),
          icon: CircleIcon,
          status: "completed",
        },
      ];
    }

    if (currentStatus === "RETURNED") {
      return [
        {
          id: 1,
          title: "تم إرجاع الطلب",
          description: "تم إرجاع طلبك بنجاح",
          timestamp: formatTimestamp(orderDate),
          icon: CircleIcon,
          status: "completed",
        },
      ];
    }

    // Normal order flow steps
    const steps: OrderStep[] = [
      {
        id: 1,
        title: "تم تأكيد الطلب",
        description: "تم استلام طلبك وتأكيده",
        timestamp: formatTimestamp(orderDate),
        icon: CheckIcon,
        status: "completed", // Always completed since order exists
      },
      {
        id: 2,
        title: "قيد التجهيز",
        description: "يتم تجهيز طلبك وتعبئته",
        timestamp: formatTimestamp(confirmedAt),
        icon: PackageIcon,
        status: currentStatus === "PENDING" ? "current" : "completed",
      },
      {
        id: 3,
        title: "تم الشحن",
        description: "طلبك في الطريق إليك",
        timestamp:
          currentStatus === "SHIPPED" || currentStatus === "DELIVERED"
            ? formatTimestamp(confirmedAt)
            : undefined,
        icon: TruckIcon,
        status:
          currentStatus === "DELIVERED"
            ? "completed"
            : currentStatus === "SHIPPED"
            ? "current"
            : "pending",
      },
      {
        id: 4,
        title: "تم التوصيل",
        description: "وصل طلبك بنجاح",
        timestamp: formatTimestamp(deliveredAt),
        icon: HomeIcon,
        status: currentStatus === "DELIVERED" ? "completed" : "pending",
      },
    ];

    return steps;
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
    <div className={cn("max-w-6xl mx-auto mb-8 sm:mb-12", className)}>
      <div className="relative px-2 sm:px-4">
        {/* Mobile/Tablet Layout - Vertical Steps */}
        <div className="block lg:hidden">
          <div className="space-y-4 sm:space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex items-start gap-3 sm:gap-4"
                custom={index}
                variants={fadeInVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Step Circle */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    className={cn(
                      "relative w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 sm:border-3 transition-all duration-300",
                      {
                        "bg-green-500 border-green-500 shadow-lg shadow-green-500/30":
                          step.status === "completed",
                        "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/30":
                          step.status === "current",
                        "bg-gray-100 border-gray-300":
                          step.status === "pending",
                      }
                    )}
                    variants={
                      step.status === "current" ? pulseVariants : undefined
                    }
                    animate={step.status === "current" ? "pulse" : undefined}
                  >
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 * index }}
                    >
                      {step.status === "completed" ? (
                        <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      ) : step.status === "current" ? (
                        <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      ) : (
                        <CircleIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 fill-current" />
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

                  {/* Connecting line for mobile */}
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-8 sm:h-12 bg-gray-200 mt-2">
                      {step.status === "completed" && (
                        <motion.div
                          className="w-full bg-gradient-to-b from-green-400 to-green-600"
                          initial={{ height: 0 }}
                          animate={{ height: "100%" }}
                          transition={{ delay: 0.3 * index, duration: 0.5 }}
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 min-w-0 pt-1">
                  <motion.h3
                    className={cn("text-sm sm:text-base font-bold mb-1", {
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
                    className="text-xs sm:text-sm text-gray-600 mb-2 leading-relaxed"
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
        </div>

        {/* Desktop Layout - Horizontal Steps */}
        <div className="hidden lg:block">
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
                      "relative w-16 h-16 xl:w-20 xl:h-20 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                      {
                        "bg-green-500 border-green-500 shadow-lg shadow-green-500/30":
                          step.status === "completed",
                        "bg-blue-500 border-blue-500 shadow-lg shadow-blue-500/30":
                          step.status === "current",
                        "bg-gray-100 border-gray-300":
                          step.status === "pending",
                      }
                    )}
                    variants={
                      step.status === "current" ? pulseVariants : undefined
                    }
                    animate={step.status === "current" ? "pulse" : undefined}
                  >
                    <motion.div
                      variants={iconVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 0.2 * index }}
                    >
                      {step.status === "completed" ? (
                        <CheckIcon className="w-8 h-8 xl:w-10 xl:h-10 text-white" />
                      ) : step.status === "current" ? (
                        <step.icon className="w-8 h-8 xl:w-10 xl:h-10 text-white" />
                      ) : (
                        <CircleIcon className="w-6 h-6 xl:w-8 xl:h-8 text-gray-400 fill-current" />
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
                  <div className="mt-4 text-center max-w-36 xl:max-w-40">
                    <motion.h3
                      className={cn("text-sm xl:text-base font-bold mb-2", {
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
                      className="text-xs xl:text-sm text-gray-600 mb-3 leading-tight"
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
                            "bg-blue-50 text-blue-700":
                              step.status === "current",
                            "bg-gray-50 text-gray-700":
                              step.status === "pending",
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

            {/* Progress Lines - Desktop only */}
            <div className="absolute rtl:rotate-180 top-8 xl:top-10 left-1/6 right-1/6 h-1 -z-0">
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
        </div>
      </div>

      {/* Order Status Badge */}
      <motion.div
        className="flex justify-center mt-6 lg:mt-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Badge
          variant="outline"
          className={cn(
            "text-xs sm:text-sm lg:text-base px-3 py-2 lg:px-4 lg:py-2 font-medium",
            {
              "border-green-500 text-green-700 bg-green-50":
                currentStatus === "DELIVERED",
              "border-blue-500 text-blue-700 bg-blue-50":
                currentStatus === "SHIPPED",
              "border-orange-500 text-orange-700 bg-orange-50":
                currentStatus === "PENDING" || currentStatus === "CONFIRMED",
              "border-red-500 text-red-700 bg-red-50":
                currentStatus === "CANCELLED" || currentStatus === "RETURNED",
            }
          )}
        >
          حالة الطلب: {getStatusInArabic(currentStatus)}
        </Badge>
      </motion.div>
    </div>
  );
}
