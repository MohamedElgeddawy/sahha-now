"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { AuthSeparator } from "@/components/auth/AuthSeparator";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Simulate login logic
      setTimeout(() => {
        setIsLoading(false);
        router.push("/auth/otp-verification");
      }, 1000);
    } catch {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "apple") => {
    // Social login logic
    console.log(`Logging in with ${provider}`);
  };

  return (
    <AuthLayout
      title="" // Pass empty string to satisfy type requirement
      description="" // Pass empty string to satisfy type requirement
    >
      {/* Social login section */}
      <div className="w-full mb-6">
        <h2 className="font-medium text-base text-[#2C3E50] mb-4 text-center">
          يمكنك تسجيل الدخول عن طريق
        </h2>
        <div className="flex justify-center">
          <SocialLoginButtons
            onGoogle={() => handleSocialLogin("google")}
            onApple={() => handleSocialLogin("apple")}
            width={312}
          />
        </div>
      </div>

      <div className="flex flex-col items-center w-full">
        <AuthSeparator />

        {/* Login Form Container */}
        <div className="w-full max-w-[400px] mx-auto mt-6">
          {/* Form header */}
          <div className="text-right mb-6">
            <h3 className="font-semibold text-xl text-[#2C3E50] mb-2">
              تسجيل الدخول إلى حسابك
            </h3>
            <p className="text-gray-600 text-sm">
              أدخل رقم جوالك وسنرسل لك رمز تحقق لتسجيل الدخول.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Phone input */}
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
                  placeholder="رجاء إدخال رقم الجوال"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="h-12 text-base text-right pl-16"
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
                  +966
                </div>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2 justify-start">
              <Checkbox id="remember" className="border-gray-400" />
              <label htmlFor="remember" className="text-sm text-gray-600">
                تذكرني
              </label>
            </div>
            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg text-base font-medium mt-6"
              disabled={isLoading}
            >
              {isLoading ? "جاري الإرسال..." : "أرسل رمز التحقق"}
            </Button>
          </form>

          {/* Register link */}
          <div className="text-center mt-4 text-sm">
            <span className="text-[#2C3E50]">ليس لديك حساب؟ </span>
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline font-medium"
            >
              أنشئ حساب الآن
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
