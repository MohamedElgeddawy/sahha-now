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
  .check((ctx) => {
    if (ctx.value.paymentMethod === "CARD") {
      // Validate card holder name
      if (!ctx.value.name || ctx.value.name.length < 2) {
        ctx.issues.push({
          code: "custom",
          message: "الاسم مطلوب",
          path: ["name"],
          input: ctx.value.name,
        });
        return;
      }

      // Validate card number
      const cardNumber = ctx.value.number?.replace(/\s/g, "");
      if (!cardNumber || cardNumber.length < 13 || cardNumber.length > 19) {
        ctx.issues.push({
          code: "custom",
          message: "رقم البطاقة غير صحيح",
          path: ["number"],
          input: ctx.value.number,
        });
        return;
      }

      // Validate month
      if (!ctx.value.month || !/^(0[1-9]|1[0-2])$/.test(ctx.value.month)) {
        ctx.issues.push({
          code: "custom",
          message: "الشهر غير صحيح",
          path: ["month"],
          input: ctx.value.month,
        });
        return;
      }

      // Validate year
      if (
        !ctx.value.year ||
        !/^(20[2-9][0-9]|20[3-9][0-9]|2[1-9][0-9]{2}|[3-9][0-9]{3})$/.test(
          ctx.value.year
        )
      ) {
        ctx.issues.push({
          code: "custom",
          message: "السنة غير صحيحة",
          path: ["year"],
          input: ctx.value.year,
        });
        return;
      }

      // Validate CVC
      if (!ctx.value.cvc || !/^[0-9]{3,4}$/.test(ctx.value.cvc)) {
        ctx.issues.push({
          code: "custom",
          message: "رمز التحقق غير صحيح",
          path: ["cvc"],
          input: ctx.value.cvc,
        });
        return;
      }
    }
  });

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
