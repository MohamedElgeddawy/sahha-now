"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { verifyOtp } from "@/lib/api/auth";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check if phone number exists
  useEffect(() => {
    const storedPhoneNumber = sessionStorage.getItem("phoneNumber");

    // If no phone number in session, check localStorage (for remember me)
    const rememberedPhone = localStorage.getItem("phoneNumber");

    if (!storedPhoneNumber && !rememberedPhone) {
      router.replace("/auth/login");
      return;
    }

    setPhoneNumber(storedPhoneNumber || rememberedPhone);
    setIsInitialized(true);

    // Set countdown timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  // Don't render anything until we check the session
  if (!isInitialized) {
    return null;
  }

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    if (value.length > 1) {
      // If pasting multiple numbers
      const numbers = value.split("").slice(0, 6);
      const newOtp = [...otp];
      numbers.forEach((num, idx) => {
        if (idx + index < 6) {
          newOtp[idx + index] = num;
        }
      });
      setOtp(newOtp);

      // Focus the next empty input or the last input
      const nextIndex = Math.min(index + numbers.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      // Single number input
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        // If current input is empty, move to previous input
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("يرجى إدخال رمز التحقق كاملاً");
      return;
    }

    if (!phoneNumber) {
      toast.error("رقم الهاتف غير موجود");
      return;
    }

    setIsLoading(true);
    try {
      await verifyOtp(phoneNumber, otpValue);
      toast.success("تم التحقق بنجاح");
      router.push("/");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "رمز التحقق غير صحيح"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    if (resendTimer > 0) return;

    setResendTimer(30);
    toast.success("تم إرسال رمز جديد");
  };

  return (
    <AuthLayout
      title="أدخل رمز التحقق المرسل إلى جوالك"
      description={
        phoneNumber
          ? `لقد أرسلنا رمز تحقق مكون من 6 أرقام إلى الرقم: +966${phoneNumber}`
          : undefined
      }
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* OTP inputs */}
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <Input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={digit}
              onChange={(e) => handleOtpChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-[52px] h-[52px] text-center text-lg font-bold border-gray-300 rounded-lg focus:border-green-500 focus:ring-green-500"
              required
            />
          ))}
        </div>

        <div className="text-center text-sm text-gray-500 mb-6">
          لم يصلك الرمز؟{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendTimer > 0}
            className={`font-medium ${
              resendTimer > 0
                ? "text-gray-400"
                : "text-green-600 hover:text-green-700 hover:underline"
            }`}
          >
            {resendTimer > 0
              ? `إعادة الإرسال خلال ${resendTimer} ثانية`
              : "إعادة إرسال الرمز"}
          </button>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg text-base font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "جاري التحقق..." : "تحقق وأكمل التسجيل"}
        </Button>
      </form>
    </AuthLayout>
  );
}
