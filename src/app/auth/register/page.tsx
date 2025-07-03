"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { AuthSeparator } from "@/components/auth/AuthSeparator";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/lib/schemas/auth";
import { FormField } from "@/components/auth/FormField";
import { register as registerApi } from "@/lib/api/auth";
import { motion } from "motion/react";

// Define animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function RegisterPage() {
  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
  } = useForm<RegisterFormData>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      mobile: "",
    },
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    if (!agreeTerms) {
      toast.error("يرجى الموافقة على الشروط والأحكام وسياسة الخصوصية");
      return;
    }

    try {
      await registerApi(data);

      // Store phone number for OTP verification
      sessionStorage.setItem("mobile", data.mobile);
      toast.success("تم إرسال رمز التحقق بنجاح");

      // Navigate to OTP verification
      router.push("/auth/otp-verification");
    } catch (error: unknown) {
      console.error("Registration error:", error);
      toast.error(
        error instanceof Error ? error.message : "حدث خطأ أثناء إنشاء الحساب"
      );
    }
  };

  const handleSocialLogin = (provider: "google" | "apple") => {
    // Social login logic
    console.log(`Registering with ${provider}`);
  };

  const socialLoginSection = (
    <div className="hidden md:block">
      <motion.div
        className="text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h2
          className="font-semibold text-base tracking-[0.5px] text-[#2C3E50] mb-6"
          variants={itemVariants}
        >
          يمكنك تسجيل الدخول عن طريق
        </motion.h2>
        <motion.div className="flex justify-center" variants={itemVariants}>
          <SocialLoginButtons
            onGoogle={() => handleSocialLogin("google")}
            onApple={() => handleSocialLogin("apple")}
            width={312}
          />
        </motion.div>
      </motion.div>
      <AuthSeparator />
    </div>
  );

  return (
    <AuthLayout title="" description="" aboveCard={socialLoginSection}>
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-[592px] mx-auto"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        {/* Form header */}
        <motion.div
          className="space-y-2 mb-6 text-right"
          variants={itemVariants}
        >
          <motion.h3 className="font-semibold text-xl text-[#2C3E50]">
            تسجيل حساب جديد
          </motion.h3>
          <motion.p className="text-gray-600 text-sm">
            أدخل البيانات التالية وسنرسل لك رمز تحقق لإنشاء حساب جديد.
          </motion.p>
        </motion.div>

        {/* Name and Phone in a row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <Controller
            control={control}
            name="fullname"
            render={({ field, fieldState: { error } }) => (
              <FormField
                label="الاسم"
                placeholder="برجاء إدخال الاسم"
                error={error}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="mobile"
            render={({ field, fieldState: { error } }) => (
              <FormField
                label="رقم الهاتف"
                placeholder="برجاء إدخال رقم الهاتف"
                type="tel"
                dir="ltr"
                inputMode="numeric"
                error={error}
                startElement={
                  <span dir="ltr" className="text-gray-600">
                    +966
                  </span>
                }
                {...field}
              />
            )}
          />
        </motion.div>

        {/* Email and Age in a row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <FormField
                label="البريد الإلكتروني"
                placeholder="برجاء إدخال البريد الإلكتروني"
                type="email"
                error={error}
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name="age"
            render={({
              field: { onChange, ...field },
              fieldState: { error },
            }) => (
              <FormField
                label="العمر"
                placeholder="برجاء إدخال العمر"
                type="number"
                error={error}
                {...field}
                onChange={(e) => {
                  onChange(Number(e.currentTarget.value));
                }}
              />
            )}
          />
        </motion.div>

        {/* Terms Checkbox */}
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(checked === true)}
            className="border-gray-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
          />
          <label htmlFor="terms" className="text-sm text-gray-600">
            أوافق على{" "}
            <Link
              prefetch
              href="/terms"
              className="text-green-600 hover:underline"
            >
              الشروط والأحكام
            </Link>{" "}
            و{" "}
            <Link
              prefetch
              href="/privacy"
              className="text-green-600 hover:underline"
            >
              سياسة الخصوصية
            </Link>
          </label>
        </motion.div>

        <Button
          type="submit"
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-[8px] text-base font-semibold"
          disabled={isSubmitting || !agreeTerms}
        >
          {isSubmitting ? "جاري التسجيل..." : "إنشاء حساب"}
        </Button>

        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="text-[#2C3E50]"> هل لديك حساب؟</span>

          <Link
            prefetch
            href="/auth/login"
            className="text-blue-600 hover:underline font-medium"
          >
            سجّل الدخول الآن
          </Link>
        </motion.div>
      </motion.form>
    </AuthLayout>
  );
}
