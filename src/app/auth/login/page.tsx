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
import { motion } from "motion/react";
import { useRef } from "react";

const loginSchema = z.object({
  mobile: z.string().regex(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط"),
});

type LoginFormData = z.infer<typeof loginSchema>;

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
  const formRef = useRef<HTMLFormElement>(null);

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

  return (
    <AuthLayout title="" description="" aboveCard={<SocialLoginSection />}>
      <motion.div
        className="w-full mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Form header */}
        <motion.div className="text-right mb-6">
          <motion.h3
            className="font-semibold text-xl text-[#2C3E50] mb-2"
            variants={itemVariants}
          >
            تسجيل الدخول إلى حسابك
          </motion.h3>
          <motion.p className="text-gray-600 text-sm" variants={itemVariants}>
            أدخل رقم جوالك وسنرسل لك رمز تحقق لتسجيل الدخول.
          </motion.p>
        </motion.div>

        <motion.form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          variants={containerVariants}
          exit="exit"
        >
          <motion.div variants={itemVariants}>
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
          </motion.div>

          {/* Remember me */}
          <motion.div
            className="flex items-center gap-2 justify-start"
            variants={itemVariants}
          >
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              className="border-gray-400"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              تذكرني
            </label>
          </motion.div>

          <Button
            type="submit"
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg text-base font-medium mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الإرسال..." : "أرسل رمز التحقق"}
          </Button>
        </motion.form>

        {/* Register link */}
        <motion.div
          className="text-center mt-4 text-sm register-link"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="text-[#2C3E50]">ليس لديك حساب؟ </span>
          <Link
            href="/auth/register"
            prefetch
            className="text-blue-600 hover:underline font-medium"
          >
            أنشئ حساب الآن
          </Link>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}

const SocialLoginSection = () => {
  const handleSocialLogin = (provider: "google" | "apple") => {
    // Social login logic
    console.log(`Logging in with ${provider}`);
  };
  return (
    <>
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
    </>
  );
};
