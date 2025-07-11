"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@components/ui/button";
import { AuthLayout } from "@components/auth/AuthLayout";
import { login, verifyOtp } from "@api/auth";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OtpFormData, otpSchema } from "@schemas/auth";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@components/ui/input-otp";
import { useAppDispatch } from "@redux/hooks";
import { setCredentials } from "@redux/slices/authSlice";
import { motion } from "motion/react";
import { useCountdown, useReadLocalStorage } from "usehooks-ts";

// Animation variants
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

// Memoized OTP input component to prevent re-renders
const OTPInput = memo(({ control }: { control: any }) => {
  const AnimatedOTPSlot = motion.create(InputOTPSlot);

  return (
    <Controller
      control={control}
      name="otp"
      render={({ field, fieldState: { error } }) => (
        <motion.div
          className="flex flex-col items-center gap-2 w-full"
          animate={{ scale: error ? [1, 1.02, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <InputOTP maxLength={6} {...field}>
            <InputOTPGroup className="gap-2 sm:gap-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <AnimatedOTPSlot
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.1 * index,
                    duration: 0.4,
                    type: "spring",
                  }}
                  whileFocus={{
                    scale: 1.1,
                    boxShadow: "0 0 0 2px rgba(34,197,94,0.6)",
                  }}
                  key={index}
                  index={index}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-xl font-semibold"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <motion.span
              className="text-xs sm:text-sm text-red-500 text-center px-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              {error.message}
            </motion.span>
          )}
        </motion.div>
      )}
    />
  );
});

OTPInput.displayName = "OTPInput";

// Memoized ResendTimer component to isolate countdown re-renders
const ResendTimer = memo(
  ({ count, onResend }: { count: number; onResend: () => void }) => {
    return (
      <motion.div
        className="text-center text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6 px-4"
        variants={itemVariants}
      >
        <span className="block sm:inline">لم يصلك الرمز؟</span>{" "}
        <motion.button
          type="button"
          onClick={onResend}
          disabled={count > 0}
          className={`font-medium block sm:inline mt-1 sm:mt-0 ${
            count > 0
              ? "text-gray-400"
              : "text-green-600 hover:text-green-700 hover:underline"
          }`}
          whileHover={{ scale: count > 0 ? 1 : 1.05 }}
          whileTap={{ scale: count > 0 ? 1 : 0.98 }}
        >
          {count > 0
            ? `إعادة الإرسال خلال ${count} ثانية`
            : "إعادة إرسال الرمز"}
        </motion.button>
      </motion.div>
    );
  }
);

ResendTimer.displayName = "ResendTimer";

export default function OTPVerificationPage() {
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 30,
    countStop: 0,
    intervalMs: 1000,
  });
  const router = useRouter();
  const mobile = useReadLocalStorage("mobile", {
    deserializer(value) {
      return value?.toString() || "";
    },
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    mode: "all",
    defaultValues: {
      otp: "",
      mobile: "",
    },
  });

  // Check if phone number exists
  useEffect(() => {
    if (!mobile) {
      router.replace("/auth/login");
      return;
    }

    form.setValue("mobile", mobile, { shouldValidate: true });
    setIsInitialized(true);

    // Set countdown timer
    startCountdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile]);

  const onSubmit = async (data: OtpFormData) => {
    try {
      const verifyRes = await verifyOtp({
        ...data,
        mobile: data.mobile.startsWith("+966")
          ? data.mobile
          : `+966${data.mobile}`,
      });
      if (!verifyRes.exists) {
        toast.info("جاري إنشاء حساب جديد");
        router.replace("/auth/register");
        return;
      }
      const res = await login({
        ...data,
        mobile: data.mobile.startsWith("+966")
          ? data.mobile
          : `+966${data.mobile}`,
      });
      dispatch(
        setCredentials({
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        })
      );

      toast.success("تم التحقق بنجاح");
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("رمز التحقق غير صحيح");
    }
  };

  // Handle resend OTP - memoized to prevent recreating on every count change
  const handleResend = useCallback(async () => {
    if (count > 0) return;
    resetCountdown();
    toast.success("تم إرسال رمز جديد");
  }, [resetCountdown, count]);

  if (!isInitialized) {
    return null;
  }

  return (
    <AuthLayout
      title="أدخل رمز التحقق المرسل إلى جوالك"
      description={
        mobile ? (
          <p>
            لقد أرسلنا رمز تحقق مكون من 6 أرقام إلى الرقم:{" "}
            <span className="font-bold" dir="ltr">
              {mobile.startsWith("+966") ? mobile : `+966${mobile}`}
            </span>
          </p>
        ) : undefined
      }
    >
      <motion.form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 sm:space-y-6 px-4 sm:px-0"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
        {/* OTP inputs */}
        <motion.div
          className="flex justify-center mb-6 sm:mb-8"
          variants={itemVariants}
        >
          <OTPInput control={form.control} />
        </motion.div>

        {/* Resend Timer - isolated to prevent full page re-renders */}
        <ResendTimer count={count} onResend={handleResend} />

        <Button
          type="submit"
          className="w-full h-11 sm:h-12 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm sm:text-base font-semibold mt-6 sm:mt-8"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {form.formState.isSubmitting
            ? "جاري التحقق..."
            : "تحقق وأكمل التسجيل"}
        </Button>
      </motion.form>
    </AuthLayout>
  );
}
