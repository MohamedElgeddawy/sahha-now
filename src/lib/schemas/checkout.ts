import { z } from "zod";

export const checkoutSchema = z
  .object({
    fullname: z.string().min(2, "الاسم مطلوب"),
    phoneNumber: z.string().min(10, "رقم الهاتف غير صحيح"),
    city: z.string().min(1, "المدينة مطلوبة"),
    district: z.string().min(1, "الحي مطلوب"),
    street: z.string().min(1, "الشارع مطلوب"),
    building: z.string().min(1, "رقم المبنى / الشقة مطلوب"),
    name: z.string().optional(),
    number: z.string().optional(),
    month: z.string().optional(),
    year: z.string().optional(),
    cvc: z.string().optional(),
    paymentMethod: z.enum(["CASH_ON_DELIVERY", "CARD", "APPLE_PAY"]),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "CARD") {
        return (
          z.string().min(2, "الاسم مطلوب").safeParse(data.name).success &&
          z
            .string()
            .min(13, "رقم البطاقة غير صحيح")
            .max(19, "رقم البطاقة غير صحيح")
            .safeParse(data.number?.replace(/\s/g, "")).success &&
          z
            .string()
            .regex(/^(0[1-9]|1[0-2])$/, "الشهر  غير صحيح")
            .safeParse(data.month).success &&
          z
            .string()
            .regex(
              /^(20[2-9][0-9]|20[3-9][0-9]|2[1-9][0-9]{2}|[3-9][0-9]{3})$/,
              "السنة غير صحيحة"
            )
            .safeParse(data.year).success &&
          z
            .string()
            .regex(/^[0-9]{3,4}$/, "رمز التحقق غير صحيح")
            .safeParse(data.cvc).success
        );
      }
      return true;
    },
    {
      message: "بيانات البطاقة غير صحيحة",
      path: ["name", "number", "month", "year", "cvc"], // Show error on all card fields
    }
  );

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
