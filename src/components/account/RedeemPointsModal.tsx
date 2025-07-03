"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useRedeemPoints } from "@/lib/hooks/use-loyalty";

const POINTS_PER_SAR = 50;

interface RedeemPointsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (redeemedPoints: number, earnedAmount: number) => void;
  availablePoints: number;
}

export function RedeemPointsModal({
  open,
  onOpenChange,
  onSuccess,
  availablePoints,
}: RedeemPointsModalProps) {
  const [pointsToRedeem, setPointsToRedeem] = useState("");
  const { mutate: redeemPoints, isPending } = useRedeemPoints();

  // Calculate SAR value (50 points = 1 SAR)
  const calculateSAR = (points: number) => {
    return (points / POINTS_PER_SAR).toFixed(2);
  };

  const pointsNumber = parseInt(pointsToRedeem) || 0;
  const sarValue = calculateSAR(pointsNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (pointsNumber < POINTS_PER_SAR) {
      return;
    }

    if (pointsNumber > availablePoints) {
      return;
    }

    redeemPoints(pointsNumber, {
      onSuccess: () => {
        const earnedAmount = pointsNumber / POINTS_PER_SAR; // 50 points = 1 SAR
        setPointsToRedeem("");
        onSuccess(pointsNumber, earnedAmount);
      },
    });
  };

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setPointsToRedeem(value);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            استبدل نقاطك
          </DialogTitle>
          <DialogDescription className="text-gray-600 text-center">
            أدخل عدد النقاط التي ترغب في استبدالها للحصول على خصم
          </DialogDescription>
        </DialogHeader>

        <div className="pt-4">
          {/* Content */}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Points Input */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نقاط
                </label>
                <Input
                  type="text"
                  value={pointsToRedeem}
                  onChange={handlePointsChange}
                  placeholder="0"
                  className="text-center text-lg font-semibold"
                  disabled={isPending}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ريس
                </label>
                <Input
                  type="text"
                  value={sarValue}
                  placeholder="0"
                  className="text-center text-lg font-semibold bg-gray-50"
                  disabled
                  readOnly
                />
              </div>
            </div>

            {/* Exchange Rate Info */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>{POINTS_PER_SAR} نقطة = 1 ريال سعودي</span>
            </div>

            {/* Validation Messages */}
            {pointsNumber > 0 && pointsNumber < POINTS_PER_SAR && (
              <p className="text-red-500 text-sm text-center">
                الحد الأدنى للاستبدال هو {POINTS_PER_SAR} نقطة
              </p>
            )}

            {pointsNumber > availablePoints && (
              <p className="text-red-500 text-sm text-center">
                عدد النقاط المدخل أكبر من الرصيد المتاح ({availablePoints} نقطة)
              </p>
            )}

            {/* Available Points Display */}
            <div className="text-center text-sm text-gray-600">
              الرصيد المتاح: {availablePoints.toLocaleString()} نقطة
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg font-semibold"
              disabled={
                isPending ||
                pointsNumber < POINTS_PER_SAR ||
                pointsNumber > availablePoints ||
                pointsNumber === 0
              }
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  جاري الاستبدال...
                </>
              ) : (
                "استبدال"
              )}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
