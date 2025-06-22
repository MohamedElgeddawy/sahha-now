"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { AuthSeparator } from "@/components/auth/AuthSeparator";
import { FormField } from "@/components/auth/FormField";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { generateOtp, login as loginApi } from "@/lib/api/auth";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";

const loginSchema = z.object({
  mobile: z
    .string()

    .regex(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      mobile: "",
    },
  });

  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await generateOtp({ mobile: data.mobile });

      if (rememberMe) {
        localStorage.setItem("mobile", data.mobile);
      } else {
        sessionStorage.setItem("mobile", data.mobile);
      }

      toast.success("تم إرسال رمز التحقق بنجاح");
      router.push("/auth/otp-verification");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error instanceof Error ? error.message : "حدث خطأ أثناء تسجيل الدخول"
      );
    }
  };

  const handleSocialLogin = (provider: "google" | "apple") => {
    // Social login logic
    console.log(`Logging in with ${provider}`);
  };

  const socialLoginSection = (
    <>
      <div className="text-center">
        <h2 className="font-semibold text-base tracking-[0.5px] text-[#2C3E50] mb-6">
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
      <AuthSeparator />
    </>
  );

  return (
    <AuthLayout title="" description="" aboveCard={socialLoginSection}>
      <div className="w-full  mx-auto">
        {/* Form header */}
        <div className="text-right mb-6">
          <h3 className="font-semibold text-xl text-[#2C3E50] mb-2">
            تسجيل الدخول إلى حسابك
          </h3>
          <p className="text-gray-600 text-sm">
            أدخل رقم جوالك وسنرسل لك رمز تحقق لتسجيل الدخول.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={control}
            name="mobile"
            render={({ field, fieldState: { error } }) => (
              <FormField
                label="رقم الجوال"
                placeholder="رجاء إدخال رقم الجوال"
                startElement={
                  <span
                    dir="ltr"
                    className="text-gray-500 select-none pointer-events-none"
                  >
                    +966
                  </span>
                }
                type="number"
                inputMode="numeric"
                dir="ltr"
                error={error}
                {...field}
              />
            )}
          />

          {/* Remember me */}
          <div className="flex items-center gap-2 justify-start">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              className="border-gray-400"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              تذكرني
            </label>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg text-base font-medium mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الإرسال..." : "أرسل رمز التحقق"}
          </Button>
        </form>

        {/* Register link */}
        <div className="text-center mt-4 text-sm">
          <span className="text-[#2C3E50]">ليس لديك حساب؟ </span>
          <Link
            href="/auth/register"
            prefetch
            className="text-blue-600 hover:underline font-medium"
          >
            أنشئ حساب الآن
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
