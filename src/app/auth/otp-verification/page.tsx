"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);

  // Check if phone number exists
  useEffect(() => {
    const storedPhoneNumber = sessionStorage.getItem("phoneNumber");
    // if (!storedPhoneNumber) {
    //   router.push('/');
    //   return;
    // }
    setPhoneNumber(storedPhoneNumber);

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

  // Handle OTP input change
  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
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

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check if this is a password reset flow
      const isResetPassword = sessionStorage.getItem("resetPassword");

      toast.success("تم التحقق بنجاح");

      if (isResetPassword) {
        router.push("/auth/reset-password");
      } else {
        router.push("/");
      }
    } catch {
      toast.error("رمز التحقق غير صحيح");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    if (resendTimer > 0) return;

    setResendTimer(60);
    toast.success("تم إرسال رمز جديد");
  };

  return (
    <AuthLayout
      title="أدخل رمز التحقق المرسل إلى جوالك"
      description={`لقد أرسلنا رمز تحقق مكون من 6 أرقام إلى الرقم: +966 ${
        phoneNumber || ""
      }`}
    >
      <div className="flex flex-col items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="space-y-8 w-full max-w-[382px] mx-auto"
        >
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-11 h-12 text-center text-lg font-bold border-gray-300 rounded-md focus:border-green-500 focus:ring-green-500"
                required
              />
            ))}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold bg-green-600 hover:bg-green-700 text-white rounded-[8px]"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="mr-2">جاري التحقق...</span>
              </>
            ) : (
              "تحقق وأكمل التسجيل"
            )}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500">
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
                  ? `إعادة الإرسال (${resendTimer})`
                  : "إعادة إرسال الرمز"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
