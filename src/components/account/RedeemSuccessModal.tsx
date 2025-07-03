"use client";

import React from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const POINTS_PER_SAR = 50;

interface RedeemSuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContinueShopping: () => void;
  redeemedPoints?: number;
  earnedAmount?: number;
}

export function RedeemSuccessModal({
  open,
  onOpenChange,
  onContinueShopping,
  redeemedPoints,
  earnedAmount,
}: RedeemSuccessModalProps) {
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 text-center">
            تم الاستبدال بنجاح
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-center leading-relaxed">
            تم تطبيق الخصم على محفظتك شكراً لاستخدامك نقاط الولاء
          </DialogDescription>
        </DialogHeader>

        <div className="pt-4 text-center">
          {/* Content */}
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative mx-auto mb-6 w-20 h-20"
          >
            {/* Main Green Circle */}
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>

            {/* Animated Dots */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0.3, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-2 -right-2 w-4 h-4 bg-orange-400 rounded-full"
            />
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.2, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -bottom-1 -left-1 w-3 h-3 bg-orange-300 rounded-full"
            />
          </motion.div>

          {/* Redemption Details */}
          {redeemedPoints && earnedAmount && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
            >
              <div className="text-sm text-green-700">
                <div className="flex justify-between items-center mb-2">
                  <span>النقاط المستبدلة:</span>
                  <span className="font-semibold">
                    {redeemedPoints.toLocaleString()} نقطة
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>المبلغ المضاف للمحفظة:</span>
                  <span className="font-semibold">
                    {earnedAmount?.toFixed(2)} ر.س
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                  <span>سعر التحويل:</span>
                  <span>{POINTS_PER_SAR} نقطة = 1 ر.س</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <Button
              onClick={onContinueShopping}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-semibold"
            >
              متابعة التسوق
            </Button>

            <Button
              onClick={handleClose}
              variant="outline"
              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
            >
              إغلاق
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
