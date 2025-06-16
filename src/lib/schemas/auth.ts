import * as z from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().min(1, "الاسم مطلوب"),
    phoneNumber: z
      .string()
      .min(11, "رقم الهاتف يجب أن يكون 11 رقم")
      .max(11, "رقم الهاتف يجب أن يكون 11 رقم")
      .regex(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    age: z.string().min(1, "العمر مطلوب"),
    password: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(11, "رقم الهاتف يجب أن يكون 11 رقم")
    .max(11, "رقم الهاتف يجب أن يكون 11 رقم")
    .regex(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
