"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authApi, RegisterData } from "@/lib/api/auth";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authApi.register(formData);
      toast.success("تم إنشاء الحساب بنجاح");
      router.push("/auth/verify-otp"); // Redirect to OTP verification
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء إنشاء الحساب");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          الاسم
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="mt-1"
          placeholder="أدخل اسمك"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          البريد الإلكتروني
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1"
          placeholder="أدخل بريدك الإلكتروني"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700"
        >
          رقم الهاتف
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          required
          value={formData.phone}
          onChange={handleChange}
          className="mt-1"
          placeholder="أدخل رقم هاتفك"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          كلمة المرور
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1"
          placeholder="أدخل كلمة المرور"
        />
      </div>

      <div>
        <label
          htmlFor="password_confirmation"
          className="block text-sm font-medium text-gray-700"
        >
          تأكيد كلمة المرور
        </label>
        <Input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          required
          value={formData.password_confirmation}
          onChange={handleChange}
          className="mt-1"
          placeholder="أدخل تأكيد كلمة المرور"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-[#27AE60] hover:bg-[#219653]"
        disabled={isLoading}
      >
        {isLoading ? "جاري التسجيل..." : "إنشاء حساب"}
      </Button>
    </form>
  );
}
