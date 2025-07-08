import { z } from "zod";

export const checkoutSchema = z.object({
  fullname: z.string().min(2, "الاسم مطلوب"),
  phoneNumber: z.string().min(10, "رقم الهاتف غير صحيح"),
  city: z.string().min(1, "المدينة مطلوبة"),
  district: z.string().min(1, "الحي مطلوب"),
  street: z.string().min(1, "الشارع مطلوب"),
  building: z.string().min(1, "رقم المبنى / الشقة مطلوب"),
  name: z.string().min(2, "اسم حامل البطاقة مطلوب"),
  number: z
    .string()
    .min(13, "رقم البطاقة غير صحيح")
    .max(19, "رقم البطاقة غير صحيح"),
  month: z.string().regex(/^(0[1-9]|1[0-2])$/, "الشهر غير صحيح"),
  year: z
    .string()
    .regex(
      /^(20[2-9][0-9]|20[3-9][0-9]|2[1-9][0-9]{2}|[3-9][0-9]{3})$/,
      "السنة غير صحيحة"
    ),
  cvc: z.string().regex(/^[0-9]{3,4}$/, "رمز الأمان غير صحيح"),
  paymentMethod: z.enum(["CASH_ON_DELIVERY", "CARD", "APPLE_PAY"]),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
