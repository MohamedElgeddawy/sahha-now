"use client";

import React, { useCallback, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ThreeDSecureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionUrl: string;
  onVerificationComplete: () => void;
}

export function ThreeDSecureModal({
  open,
  onOpenChange,
  transactionUrl,
  onVerificationComplete,
}: ThreeDSecureModalProps) {
  const ref = useRef<HTMLIFrameElement>(null);
  const handleClose = () => {
    onOpenChange(false);
    onVerificationComplete();
  };

  const handleMessage = useCallback(() => {
    const url = ref.current?.contentWindow?.location.href;
    const searchParams = (url?.split("?")[1].split("&") || []).map((param) =>
      param.split("=")
    );
    console.log(searchParams);

    const status = searchParams.find((param) => param[0] === "status")?.[1];
    const message = searchParams.find((param) => param[0] === "message")?.[1];

    if (status === "success") {
      handleClose();
    }
  }, [ ref.current?.contentWindow?.location.href]);

  useEffect(() => {
    if (ref.current) {
      handleMessage();
    }
  }, [handleMessage]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-gray-900">
              التحقق من البطاقة
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            يرجى إكمال عملية التحقق من البطاقة في النافذة أدناه
          </p>
        </DialogHeader>

        <div className="flex-1 p-6 pt-4">
          <div className="relative w-full h-full min-h-[500px] border border-gray-200 rounded-lg overflow-hidden">
            <iframe
              ref={ref}
              src={transactionUrl}
              className="w-full h-full"
              title="3D Secure Verification"
              allow="payment"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
