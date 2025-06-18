import * as z from "zod";

export const registerSchema = z.object({
  fullName: z.string(),
  phoneNumber: z.string(),

  email: z.string().email("البريد الإلكتروني غير صحيح"),
  age: z.number(),
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
