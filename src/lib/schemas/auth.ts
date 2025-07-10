import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string().min(3, "الاسم يجب أن يكون أكثر من 3 أحرف"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  age: z.number().min(13, "يجب أن يكون العمر أكبر من 13 سنة"),
});

export const loginSchema = z.object({
  mobile: z.string(),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "رمز التحقق يجب أن يكون 6 أرقام")
    .regex(/^\d+$/, "رمز التحقق يجب أن يحتوي على أرقام فقط"),
  mobile: z.string(),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
