"use client";

import React, { useMemo, useState } from "react";
import { useForm, Controller, Form, FormProvider } from "react-hook-form";
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
import { CreditCardForm } from "@/components/checkout/CreditCardForm";
import { ThreeDSecureModal } from "@/components/checkout/ThreeDSecureModal";
import axios, { AxiosResponse } from "axios";
import sahhaInstance from "@/lib/api/sahhaInstance";

type MoyasarTokenResponse = {
  id: string;
  status: string;
  brand: string;
  funding: string;
  country: string;
  month: string;
  year: string;
  name: string;
  last_four: string;
  metadata: string | null;
  message: string | null;
  verification_url: string;
  created_at: string;
  updated_at: string;
  expires_at: string;
};

const CheckoutPage = () => {
  const router = useRouter();
  const { cart } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [show3DSModal, setShow3DSModal] = useState(false);
  const [transactionUrl, setTransactionUrl] = useState("");

  const methods = useForm<CheckoutFormData>({
    mode: "all",
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullname: "",
      phoneNumber: "",
      city: "",
      district: "",
      street: "",
      building: "",
      paymentMethod: "CASH_ON_DELIVERY",
      cvc: "",
      month: "",
      year: "",
      name: "",
      number: "",
    },
  });
  const { control, handleSubmit, setValue, watch } = methods;
  const paymentMethod = watch("paymentMethod");

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      const axiosInstance = axios.create({
        baseURL: "https://api.moyasar.com/v1",
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: "pk_test_VNScH4SFaFiGb2A7Wa4GA1SdN9oDndUFbMJ8H8nF",
          password: "",
        },
      });
      const responseData = (await axiosInstance.post("/tokens", {
        number: data.number.replace(/\s/g, ""),
        callback_url: window.location.href,
        cvc: data.cvc,
        month: data.month,
        year: data.year,
        name: data.name,
      })) as AxiosResponse<MoyasarTokenResponse>;
      const res = await sahhaInstance.post("/orders", {
        fullname: data.fullname,
        phoneNumber: data.phoneNumber,
        city: data.city,
        district: data.district,
        street: data.street,
        building: data.building,
        paymentMethod: "CARD",
        payWithWallet: true,
        saveToken: true,
        tokenData: {
          token: responseData.data.id,
          funding: responseData.data.funding,
          brand: responseData.data.brand,
          lastFour: responseData.data.last_four,
          expiryMonth: responseData.data.month,
          expiryYear: responseData.data.year,
        },
        cvc: data.cvc,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handle3DSVerificationComplete = () => {
    setShow3DSModal(false);
    // Redirect to success page after 3DS verification
    router.push("/checkout/success");
  };

  const shippingCost = useMemo(() => 16.32, []);
  const totalCost = useMemo(
    () => parseFloat(cart.data?.totalPrice || "0") + shippingCost,
    [cart.data?.totalPrice, shippingCost]
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

      <FormProvider {...methods}>
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
                  name="fullname"
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
                  name="phoneNumber"
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
                  name="district"
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
                <h2 className="text-xl font-bold text-start mb-4">
                  طريقة الدفع
                </h2>

                <div className="space-y-4">
                  {/* Cash on Delivery */}
                  <div
                    className={cn(
                      `flex items-center gap-2 p-4 border-gray-200 rounded-lg border cursor-pointer`,
                      {
                        "border-slate-700":
                          paymentMethod === "CASH_ON_DELIVERY",
                      }
                    )}
                    onClick={() => {
                      setValue("paymentMethod", "CASH_ON_DELIVERY", {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <div
                      className={cn(
                        `size-5 border-gray-400 rounded-full border-2 flex items-center justify-center`,
                        {
                          "border-slate-700":
                            paymentMethod === "CASH_ON_DELIVERY",
                        }
                      )}
                    >
                      {paymentMethod === "CASH_ON_DELIVERY" && (
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
                        "border-slate-700": paymentMethod === "CARD",
                      }
                    )}
                    onClick={() => {
                      setValue("paymentMethod", "CARD", {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          `size-5 border-gray-400 rounded-full border-2 flex items-center justify-center`,
                          { "border-slate-700": paymentMethod === "CARD" }
                        )}
                      >
                        {paymentMethod === "CARD" && (
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
                        "border-slate-700": paymentMethod === "APPLE_PAY",
                      }
                    )}
                    onClick={() => {
                      setValue("paymentMethod", "APPLE_PAY", {
                        shouldValidate: true,
                      });
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          `size-5 border-gray-400 rounded-full border-2 flex items-center justify-center`,
                          { "border-slate-700": paymentMethod === "APPLE_PAY" }
                        )}
                      >
                        {paymentMethod === "APPLE_PAY" && (
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

                {/* Credit Card Form */}
                {paymentMethod === "CARD" && (
                  <div className="mt-6 p-6 border border-gray-200 rounded-lg bg-gray-50">
                    <h3 className="text-lg font-semibold text-start mb-4">
                      بيانات البطاقة
                    </h3>
                    <CreditCardForm />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <Button
                  disabled={methods.formState.isSubmitting}
                  type="submit"
                  className="w-full py-4 text-lg"
                >
                  {methods.formState.isSubmitting
                    ? "جاري المعالجة..."
                    : "الدفع الآن"}
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
              {cart.data?.cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 pb-4">
                  <div className="relative size-20 rounded-md overflow-hidden">
                    <Image
                      src={item.variant.product.media?.[0]?.url}
                      alt={item.variant.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 text-start space-y-1">
                    <p className="font-medium">{item.variant.product.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.variant.product.brandId || ""}
                    </p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold">
                        {item.quantity} ×{" "}
                        {parseFloat(item.variant.price).toFixed(2)} ر.س
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
                  {parseFloat(cart.data?.totalPrice || "0").toFixed(2)} ر.س
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
      </FormProvider>

      {/* 3D Secure Modal
      <ThreeDSecureModal
        open={show3DSModal}
        onOpenChange={setShow3DSModal}
        transactionUrl={transactionUrl}
        onVerificationComplete={handle3DSVerificationComplete}
      /> */}
    </>
  );
};

export default CheckoutPage;
