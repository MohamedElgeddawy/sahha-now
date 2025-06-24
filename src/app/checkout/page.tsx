"use client";

import React, { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { FormField } from "@/components/auth/FormField";
import { Button } from "@/components/ui/button";
import { checkoutSchema, type CheckoutFormData } from "@/lib/schemas/checkout";
import { useCart } from "@/lib/hooks/use-cart";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const router = useRouter();
  const { items, subtotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card" | "apple">(
    "cash"
  );
  const [couponCode, setCouponCode] = useState("");
  const { control, handleSubmit } = useForm<CheckoutFormData>({
    mode: "all",
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      neighborhood: "",
      street: "",
      building: "",
    },
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Form data:", data);
    console.log("Payment method:", paymentMethod);
    router.push("/checkout/success");
    // Submit order logic here
  };

  const shippingCost = useMemo(() => 16.32, []);
  const totalCost = useMemo(
    () => subtotal + shippingCost,
    [subtotal, shippingCost]
  );

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "السلة", href: "/cart" },
          { label: "الدفع", href: "/checkout" },
        ]}
      />

      <div className="grid lg:grid-cols-3 items-start gap-8">
        {/* Delivery Info Form */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl text-slate-800 font-bold text-start mb-4">
            بيانات التوصيل
          </h1>
          <p className="text-start text-gray-600 mb-6">
            يرجى إدخال بيانات التوصيل لتوصيل المنتجات في أسرع وقت.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormField
                    label="الاسم"
                    placeholder="يرجى إدخال اسم المستخدم"
                    required
                    error={error}
                    {...field}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormField
                    label="رقم هاتف"
                    placeholder="يرجى إدخال رقم هاتفك"
                    required
                    error={error}
                    {...field}
                  />
                )}
              />
            </div>
            {/* Address Fields */}

            <div className="grid md:grid-cols-2 gap-6">
              <Controller
                name="city"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormField
                    label="المدينة"
                    placeholder="يرجى إدخال المدينة"
                    required
                    error={error}
                    {...field}
                  />
                )}
              />
              <Controller
                name="neighborhood"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormField
                    label="الحي"
                    placeholder="يرجى إدخال اسم الحي"
                    required
                    error={error}
                    {...field}
                  />
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Controller
                name="street"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormField
                    label="اسم الشارع"
                    placeholder="يرجى إدخال اسم الشارع"
                    required
                    error={error}
                    {...field}
                  />
                )}
              />
              <Controller
                name="building"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormField
                    label="رقم المبنى / الشقة"
                    placeholder="يرجى إدخال رقم المبنى / الشقة"
                    required
                    error={error}
                    {...field}
                  />
                )}
              />
            </div>

            {/* Payment Method */}
            <div>
              <h2 className="text-xl font-bold text-start mb-4">طريقة الدفع</h2>

              <div className="space-y-4">
                {/* Cash on Delivery */}
                <div
                  className={cn(
                    `flex items-center gap-2 p-4 border-gray-200 rounded-lg border cursor-pointer`,
                    {
                      "border-slate-700": paymentMethod === "cash",
                    }
                  )}
                  onClick={() => setPaymentMethod("cash")}
                >
                  <div
                    className={cn(
                      `size-5 border-gray-400 rounded-full border-2 flex items-center justify-center`,
                      { "border-slate-700": paymentMethod === "cash" }
                    )}
                  >
                    {paymentMethod === "cash" && (
                      <div className="size-3 rounded-full bg-slate-700"></div>
                    )}
                  </div>
                  <span className="font-medium text-gray-500">
                    الدفع عند الاستلام
                  </span>
                </div>

                {/* Card Payment */}
                <div
                  className={cn(
                    `flex items-center gap-2 p-4 border-gray-200 rounded-lg border cursor-pointer`,
                    {
                      "border-slate-700": paymentMethod === "card",
                    }
                  )}
                  onClick={() => setPaymentMethod("card")}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        `size-5 border-gray-400 rounded-full border-2 flex items-center justify-center`,
                        { "border-slate-700": paymentMethod === "card" }
                      )}
                    >
                      {paymentMethod === "card" && (
                        <div className="size-3 rounded-full bg-slate-700"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-500">
                      الدفع ببطاقات الدفع
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Image
                      src="/icons/payment/VISA.svg"
                      alt="Visa"
                      width={40}
                      height={24}
                    />
                    <Image
                      src="/icons/payment/MASTERCARD.svg"
                      alt="Mastercard"
                      width={40}
                      height={24}
                    />
                    <Image
                      src="/icons/payment/MADA.svg"
                      alt="Mada"
                      width={40}
                      height={24}
                    />
                  </div>
                </div>

                {/* Apple Pay */}
                <div
                  className={cn(
                    `flex items-center gap-2 p-4 border-gray-200 rounded-lg border cursor-pointer`,
                    {
                      "border-slate-700": paymentMethod === "apple",
                    }
                  )}
                  onClick={() => setPaymentMethod("apple")}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        `size-5 border-gray-400 rounded-full border-2 flex items-center justify-center`,
                        { "border-slate-700": paymentMethod === "apple" }
                      )}
                    >
                      {paymentMethod === "apple" && (
                        <div className="size-3 rounded-full bg-slate-700"></div>
                      )}
                    </div>
                    <span className="font-medium text-gray-500">
                      الدفع عن طريق Apple Pay
                    </span>
                  </div>
                  <div>
                    <Image
                      src="/icons/payment/APPLE_pay.svg"
                      alt="Apple Pay"
                      width={60}
                      height={30}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <Button type="submit" className="w-full py-4 text-lg">
                الدفع الآن
              </Button>
            </div>
          </form>
        </div>
        {/* Cart Summary */}
        <div className="lg:col-span-1 bg-[#F6F6F6] rounded-lg p-6">
          <h2 className="text-xl font-semibold text-start mb-4">
            راجع محتويات سلة التسوق الخاصة بك
          </h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 pb-4">
                <div className="relative size-20 rounded-md overflow-hidden">
                  <Image
                    src={item.product.media?.[0]?.url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 text-start space-y-1">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.product.brand?.name || ""}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold">
                      {item.quantity} ×{" "}
                      {parseFloat(item.product.price).toFixed(2)} ر.س
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <div className="flex gap-2">
              <Input
                placeholder="الرجاء إدخال كود الخصم"
                className="h-12"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <Button>تطبيق الخصم</Button>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-start">
            <div className="flex justify-between">
              <span>المجموع الفرعي</span>
              <span className="font-medium text-green-700">
                {subtotal.toFixed(2)} ر.س
              </span>
            </div>
            <div className="flex justify-between">
              <span>خدمة التوصيل</span>
              <span className="font-medium text-green-700">
                {shippingCost.toFixed(2)} ر.س
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="font-bold">الإجمالي</span>
              <span className="font-bold text-green-700">
                {totalCost.toFixed(2)} ر.س
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
