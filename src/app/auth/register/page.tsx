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
import { toast } from "sonner";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("يرجى إدخال الاسم");
      return false;
    }

    if (!formData.phoneNumber.trim()) {
      toast.error("يرجى إدخال رقم الهاتف");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("يرجى إدخال البريد الإلكتروني");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("البريد الإلكتروني غير صحيح");
      return false;
    }

    if (!formData.age.trim()) {
      toast.error("يرجى إدخال العمر");
      return false;
    }

    if (!formData.password) {
      toast.error("يرجى إدخال كلمة المرور");
      return false;
    } else if (formData.password.length < 8) {
      toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return false;
    }

    if (!agreeTerms) {
      toast.error("يرجى الموافقة على الشروط والأحكام وسياسة الخصوصية");
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

      // Store phone number for OTP verification
      sessionStorage.setItem("phoneNumber", formData.phoneNumber);

      toast.success("تم إرسال رمز التحقق بنجاح");

      // Navigate to OTP verification
      router.push("/auth/otp-verification");
    } catch (error: unknown) {
      // Log the error and show a toast message
      console.error("Registration error:", error);
      toast.error(
        error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الحساب"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: "google" | "apple") => {
    // Social login logic
    console.log(`Registering with ${provider}`);
  };

  return (
    // <AuthLayout
    //   title="تسجيل حساب جديد"
    //   description="أدخل البيانات التالية وسنرسل لك رمز تحقق لإنشاء حساب جديد."
    // >
    <AuthLayout
      title="" // Pass empty string to satisfy type requirement
      description="" // Pass empty string to satisfy type requirement
    >
      {/* Social login section */}
      <div className="w-full">
        <h2 className="font-semibold text-base tracking-[0.5px] text-[#2C3E50] mb-6 text-center">
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
        <form
          onSubmit={handleSubmit}
          className="space-y-6 w-full max-w-[592px] mx-auto"
        >
          {/* Form header */}
          <div className="space-y-2 mb-6 text-right">
            <h3 className="font-semibold text-xl text-[#2C3E50]">
              تسجيل حساب جديد
            </h3>
            <p className="text-gray-600 text-sm">
              أدخل البيانات التالية وسنرسل لك رمز تحقق لإنشاء حساب جديد.
            </p>
          </div>

          {/* Name and Phone in a row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                الاسم
              </label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="برجاء إدخال الاسم"
                value={formData.fullName}
                onChange={handleChange}
                className="h-12 text-base text-right"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                رقم الهاتف
              </label>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  dir="ltr"
                  inputMode="numeric"
                  placeholder="برجاء إدخال رقم الهاتف"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="h-12 text-base text-right pl-16"
                  required
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
                  +966
                </div>
              </div>
            </div>
          </div>

          {/* Email and Age in a row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                البريد الإلكتروني
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="برجاء إدخال البريد الإلكتروني"
                value={formData.email}
                onChange={handleChange}
                className="h-12 text-base text-right"
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 text-right"
              >
                العمر
              </label>
              <Input
                id="age"
                name="age"
                type="number"
                placeholder="برجاء إدخال العمر"
                value={formData.age}
                onChange={handleChange}
                className="h-12 text-base text-right"
                required
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              className="border-gray-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              أوافق على{" "}
              <Link href="/terms" className="text-green-600 hover:underline">
                الشروط والأحكام
              </Link>{" "}
              و{" "}
              <Link href="/privacy" className="text-green-600 hover:underline">
                سياسة الخصوصية
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-[8px] text-base font-semibold"
            disabled={isLoading || !agreeTerms}
          >
            {isLoading ? "جاري التسجيل..." : "إنشاء حساب"}
          </Button>
          <div className="text-center mt-4">
            <Link
              href="/auth/login"
              className="text-green-600 hover:underline text-sm font-medium"
            >
              لديك حساب بالفعل؟ سجل الدخول الآن
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}
