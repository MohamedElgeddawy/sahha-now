"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  useUserProfile,
  userProfileSchema,
  type UserProfileData,
} from "@/lib/hooks/use-user-profile";
import { FormField } from "../auth/FormField";

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
      <div className="bg-gray-50 rounded-lg flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
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
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-[#2C3E50] mb-6 text-right">
        المعلومات الشخصية
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              <FormField label="العمر" type="number" error={error} {...field} required />
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white min-w-56 !py-5 text-base rounded-lg"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جاري الحفظ...
              </>
            ) : (
              "حفظ التعديلات"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
