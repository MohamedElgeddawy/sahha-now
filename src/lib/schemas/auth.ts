import { z } from "zod";

export const registerSchema = z.object({
  fullname: z.string(),
  mobile: z.string(),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  age: z.number().min(18, "يجب أن يكون العمر أكبر من 18 سنة"),
});

export const loginSchema = z.object({
  mobile: z
    .string()
    .length(11, "رقم الهاتف يجب أن يكون 11 رقم")
    .regex(/^01[0125][0-9]{8}$/, "رقم الهاتف غير صحيح"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
