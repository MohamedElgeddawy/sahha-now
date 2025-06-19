"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { login } from "@/lib/api/auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpFormData, otpSchema } from "@/lib/schemas/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLocalStorage } from "usehooks-ts";

export default function OTPVerificationPage() {
  const [resendTimer, setResendTimer] = useState(30);
  const router = useRouter();
  const [mobile, setPhoneNumber] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [_accessToken, setAccessToken] = useLocalStorage<string | null>(
    "accessToken",
    null
  );
  const [_refreshToken, setRefreshToken] = useLocalStorage<string | null>(
    "refreshToken",
    null
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
      mobile: "",
    },
  });

  // Check if phone number exists
  useEffect(() => {
    const storedPhoneNumber = sessionStorage.getItem("mobile");
    const rememberedPhone = localStorage.getItem("mobile");

    if (!storedPhoneNumber && !rememberedPhone) {
      router.replace("/auth/login");
      return;
    }

    const phone = storedPhoneNumber || rememberedPhone;
    setPhoneNumber(phone);
    setValue("mobile", phone || "");
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
  }, []);

  // Don't render anything until we check the session
  if (!isInitialized) {
    return null;
  }

  const onSubmit = async (data: OtpFormData) => {
    try {
      const res = await login({ ...data });
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);

      toast.success("تم التحقق بنجاح");
      router.push("/");
    } catch (error) {
      toast.error("رمز التحقق غير صحيح");
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
        mobile
          ? `لقد أرسلنا رمز تحقق مكون من 6 أرقام إلى الرقم: +966${mobile}`
          : undefined
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* OTP inputs */}
        <div className="flex justify-center gap-3 mb-8">
          <Controller
            control={control}
            name="otp"
            render={({ field, fieldState: { error } }) => (
              <div className="flex flex-col items-center gap-2 w-full">
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />

                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                {error && (
                  <span className="text-sm text-red-500">{error.message}</span>
                )}
              </div>
            )}
          />
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
          disabled={isSubmitting}
        >
          {isSubmitting ? "جاري التحقق..." : "تحقق وأكمل التسجيل"}
        </Button>
      </form>
    </AuthLayout>
  );
}
