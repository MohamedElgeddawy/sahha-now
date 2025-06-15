"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Phone, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validatePhoneNumber = (phone: string) => /^5[0-9]{8}$/.test(phone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      toast.error("يرجى إدخال رقم جوال صحيح");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store phone number for OTP verification
      sessionStorage.setItem("phoneNumber", phoneNumber);
      sessionStorage.setItem("resetPassword", "true");

      toast.success("تم إرسال رمز التحقق بنجاح");
      router.push("/auth/otp-verification");
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال رمز التحقق");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="نسيت كلمة المرور؟"
      description="أدخل رقم جوالك وسنرسل لك رمز التحقق لإعادة تعيين كلمة المرور"
    >
      <div className="flex flex-col items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-[382px] mx-auto"
        >
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 text-right"
            >
              رقم الجوال
            </label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                dir="ltr"
                inputMode="numeric"
                placeholder="يرجى إدخال رقم الجوال"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value.replace(/\D/g, ""))
                }
                className="h-12 text-base text-right pl-16"
                required
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
                +966
              </div>
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-[8px] text-base font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
                جاري الإرسال...
              </>
            ) : (
              "إرسال رمز التحقق"
            )}
          </Button>

          <div className="text-center mt-4">
            <Link
              href="/auth/login"
              className="text-green-600 hover:underline text-sm font-medium"
            >
              العودة إلى صفحة تسجيل الدخول
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
