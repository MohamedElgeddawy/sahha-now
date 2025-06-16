"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user came from OTP verification
    const resetPassword = sessionStorage.getItem("resetPassword");
    const phone = sessionStorage.getItem("phoneNumber");

    if (!resetPassword || !phone) {
      router.push("/auth/forgot-password");
      return;
    }

    setPhoneNumber(phone);
  }, [router]);

  const validateForm = () => {
    if (!password || password.length < 8) {
      toast.error("يجب أن تتكون كلمة المرور من 8 أحرف على الأقل");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Clear session storage
      sessionStorage.removeItem("resetPassword");
      sessionStorage.removeItem("phoneNumber");

      toast.success("تم تغيير كلمة المرور بنجاح");
      router.push("/");
    } catch (error) {
      toast.error("حدث خطأ أثناء تغيير كلمة المرور");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="إعادة تعيين كلمة المرور"
      description={
        <>
          قم بإنشاء كلمة مرور جديدة لحسابك
          {phoneNumber && (
            <span className="block font-medium text-gray-700 mt-1">
              +966 {phoneNumber}
            </span>
          )}
        </>
      }
    >
      <div className="flex flex-col items-center w-full">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-[382px] mx-auto"
        >
          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 text-right"
            >
              كلمة المرور الجديدة
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="أدخل كلمة المرور الجديدة"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base text-right pl-10"
                required
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 text-right">
              يجب أن تتكون كلمة المرور من 8 أحرف على الأقل
            </p>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 text-right"
            >
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="أعد إدخال كلمة المرور"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-12 text-base text-right pl-10"
                required
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
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
                جاري التحديث...
              </>
            ) : (
              "حفظ كلمة المرور الجديدة"
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
