"use client";

import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { Mail, Phone, Clock, MapPin, Send, Loader2 } from "lucide-react";
import { FormField } from "./auth/FormField";
import { motion } from "motion/react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Define Zod schema for form validation
const contactFormSchema = z.object({
  name: z.string().min(1, { message: "هذا الحقل مطلوب" }),
  email: z
    .string()
    .min(1, { message: "هذا الحقل مطلوب" })
    .email({ message: "بريد إلكتروني غير صالح" }),
  phone: z
    .string()
    .min(1, { message: "هذا الحقل مطلوب" })
    .regex(/^[0-9]+$/, { message: "رقم هاتف غير صالح" }),
  message: z
    .string()
    .min(1, { message: "هذا الحقل مطلوب" })
    .min(10, { message: "يجب أن تكون الرسالة على الأقل 10 أحرف" }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactInfo = [
  {
    icon: <Mail className="text-gray-600 size-5" />,
    text: "Support@email.com",
  },
  {
    icon: <Phone className="text-gray-600 size-5" />,
    text: "9200 XXXX",
  },
  {
    icon: <MapPin className="text-gray-600 size-5" />,
    text: "الرياض، المملكة العربية السعودية",
  },
  {
    icon: <Clock className="text-gray-600 size-5" />,
    text: "يوميًا من 9 صباحًا إلى 10 مساءً",
  },
];

export function ContactUs() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("تم إرسال رسالتك بنجاح");
        reset();
      } else {
        throw new Error("فشل إرسال الرسالة");
      }
    } catch (error) {
      alert("حدث خطأ أثناء إرسال الرسالة");
    }
  };
  return (
    <motion.div
      className="max-w-7xl mx-auto py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Form and Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Contact Form */}
          <div
            className="bg-white rounded-lg border border-[#DADADA] p-8 mb-8"
            style={{
              width: "100%",
              maxWidth: "600px",
              minHeight: "639px",
            }}
          >
            <motion.h1
              className="text-3xl font-bold text-right mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              اتصل بنا
            </motion.h1>
            <motion.p
              className="text-right mb-8 text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              نحن هنا للإجابة على استفساراتك، لا تتردد في التواصل معنا في أي
              وقت.
            </motion.p>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Form fields using FormField component */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormField
                      label="الاسم"
                      {...field}
                      error={fieldState.error}
                      placeholder="برجاء إدخال الاسم"
                      required
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <FormField
                      label="البريد الإلكتروني"
                      {...field}
                      error={fieldState.error}
                      type="email"
                      placeholder="برجاء إدخال البريد الإلكتروني"
                      required
                    />
                  )}
                />
              </div>

              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState }) => (
                  <FormField
                    label="رقم الهاتف"
                    {...field}
                    error={fieldState.error}
                    type="tel"
                    placeholder="برجاء إدخال رقم الهاتف"
                    required
                  />
                )}
              />

              <Controller
                name="message"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      الرسالة <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="message"
                      {...field}
                      placeholder="برجاء إدخال رسالتك"
                      className="w-full min-h-[80px] sm:min-h-[100px] md:min-h-[120px] text-right text-sm md:text-base md:mb-4"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500 text-right">
                        {fieldState.error.message}
                      </p>
                    )}
                  </div>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white h-12 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    جاري الإرسال...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    إرسال <Send className="size-4" />
                  </span>
                )}
              </Button>
            </motion.form>
          </div>

          {/* Contact Information Cards */}
          <div className="flex flex-wrap justify-center gap-4">
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                className="w-full sm:w-[288px] h-[48px] flex items-center justify-start gap-3 bg-white rounded-lg px-4 shadow-sm border border-[#DADADA]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
              >
                {item.icon}
                <span className="text-gray-700 text-sm">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Column - Map Section */}
        <motion.div
          className="relative h-[780px] rounded-lg overflow-hidden border border-[#DADADA]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Image
            src="/images/map.png"
            alt="Location Map"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
