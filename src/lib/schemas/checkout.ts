import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(10, "رقم الهاتف غير صحيح"),
  city: z.string().min(1, "المدينة مطلوبة"),
  street: z.string().min(1, "الشارع مطلوب"),
  neighborhood: z.string().min(1, "الحي مطلوب"),
  building: z.string().min(1, "رقم المبنى / الشقة مطلوب"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
