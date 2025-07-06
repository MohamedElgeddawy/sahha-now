"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import {
  useUserProfile,
  userProfileSchema,
  type UserProfileData,
} from "@/lib/hooks/use-user-profile";
import { FormField } from "../auth/FormField";
import {
  LoadingComponent,
  InlineLoading,
  ProfileLoadingMessages,
} from "@/components/ui/LoadingComponent";

export function PersonalInfoTab() {
  const { userProfile, isLoading, isError, updateProfile, isPending } =
    useUserProfile();

  // React Hook Form setup
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfileData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      fullname: "",
      mobile: "",
      email: "",
      age: 0,
    },
  });

  // Update form with user data when available
  useEffect(() => {
    if (userProfile) {
      reset({
        fullname: userProfile.fullname || "",
        mobile: userProfile.mobile || "",
        email: userProfile.email || "",
        age: userProfile.age || 0,
      });
    }
  }, [userProfile, reset]);

  // Form submission handler
  const onSubmit = (data: UserProfileData) => {
    updateProfile(data);
  };

  // Handle loading state
  if (isLoading) {
    return (
      <LoadingComponent
        variant="centered"
        size="lg"
        animation="particles"
        message={ProfileLoadingMessages.personalInfo}
        className="bg-gray-50 rounded-lg min-h-[400px]"
      />
    );
  }

  // Handle error state
  if (isError) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <div className="text-center py-10">
          <p className="text-red-500">حدث خطأ أثناء تحميل المعلومات الشخصية</p>
          <Button
            className="mt-4 bg-green-600 hover:bg-green-700 text-white"
            onClick={() => window.location.reload()}
          >
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 text-right">
          المعلومات الشخصية
        </h3>
        <p className="text-gray-600 text-right">
          قم بتحديث معلوماتك الشخصية للحفاظ على دقة البيانات
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* fullname Field */}
          <Controller
            control={control}
            name="fullname"
            render={({ field, fieldState: { error } }) => (
              <FormField label="الاسم" error={error} {...field} required />
            )}
          />

          {/* mobile Field */}
          <Controller
            control={control}
            name="mobile"
            render={({ field, fieldState: { error } }) => (
              <FormField
                label="رقم الهاتف"
                startElement={
                  <span
                    dir="ltr"
                    className="text-gray-500 select-none pointer-events-none"
                  >
                    +966
                  </span>
                }
                error={error}
                {...field}
                required
                disabled
                dir="ltr"
              />
            )}
          />

          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <FormField
                label="البريد الإلكتروني"
                error={error}
                {...field}
                required
              />
            )}
          />

          {/* Age Field */}
          <Controller
            control={control}
            name="age"
            render={({ field, fieldState: { error } }) => (
              <FormField
                label="العمر"
                type="number"
                error={error}
                {...field}
                required
              />
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            className="px-8 py-3 text-gray-600 hover:text-gray-800"
            onClick={() => reset()}
          >
            إلغاء
          </Button>
          <Button
            type="submit"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-80 disabled:from-green-100 disabled:to-emerald-100 text-white px-8 py-3 text-base rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            disabled={isPending}
          >
            {isPending ? (
              <InlineLoading
                message={ProfileLoadingMessages.saving}
                animation="dots"
                size="md"
                className="text-slate-900"
              />
            ) : (
              "حفظ التعديلات"
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
