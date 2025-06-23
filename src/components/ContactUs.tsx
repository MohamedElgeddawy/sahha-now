"use client";

import { useState, FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { Mail, Phone, Clock, MapPin } from "lucide-react";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export function ContactUs() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = () => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name) {
      newErrors.name = "هذا الحقل مطلوب";
    }

    if (!formData.email) {
      newErrors.email = "هذا الحقل مطلوب";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "بريد إلكتروني غير صالح";
    }

    if (!formData.phone) {
      newErrors.phone = "هذا الحقل مطلوب";
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = "رقم هاتف غير صالح";
    }

    if (!formData.message) {
      newErrors.message = "هذا الحقل مطلوب";
    } else if (formData.message.length < 10) {
      newErrors.message = "يجب أن تكون الرسالة على الأقل 10 أحرف";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("تم إرسال رسالتك بنجاح");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        throw new Error("فشل إرسال الرسالة");
      }
    } catch (error) {
      alert("حدث خطأ أثناء إرسال الرسالة");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="w-full px-2 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-8 max-w-7xl mx-auto">
        {/* Left Column - Form and Contact Info */}
        <div className="w-full lg:w-1/2 order-1">
          {/* Contact Form */}
          <div className="bg-white rounded-lg border border-[#DADADA] p-3 sm:p-4 md:p-8 mb-4 sm:mb-8 w-full ">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-right mb-3 sm:mb-4 md:mb-6">
              اتصل بنا
            </h1>
            <p className="text-right mb-4 sm:mb-6 md:mb-8 text-gray-700 text-sm sm:text-base">
              نحن هنا للإجابة على استفساراتك، لا تتردد في التواصل معنا في أي
              وقت.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-3 sm:space-y-4 md:space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-1 md:mb-2 font-medium text-right text-gray-700 text-sm sm:text-base"
                  >
                    الاسم*
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="برجاء إدخال الاسم"
                    className="w-full text-right text-sm md:text-base"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs md:text-sm mt-1 text-right">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 md:mb-2 font-medium text-right text-gray-700 text-sm sm:text-base"
                  >
                    البريد الإلكتروني*
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="برجاء إدخال البريد الإلكتروني"
                    className="w-full text-right text-sm md:text-base"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs md:text-sm mt-1 text-right">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-1 md:mb-2 font-medium text-right text-gray-700 text-sm sm:text-base"
                >
                  رقم الهاتف*
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="برجاء إدخال رقم الهاتف"
                  className="w-full text-right text-sm md:text-base"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs md:text-sm mt-1 text-right">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block mb-1 md:mb-2 font-medium text-right text-gray-700 text-sm sm:text-base"
                >
                  الرسالة*
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="برجاء إدخال رسالتك"
                  className="w-full min-h-[80px] sm:min-h-[100px] md:min-h-[120px] text-right text-sm md:text-base md:mb-4"
                />
                {errors.message && (
                  <p className="text-red-500 text-xs md:text-sm mt-1 text-right">
                    {errors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 h-10 md:h-12 text-sm md:text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "جاري الإرسال..." : "إرسال"}
              </Button>
            </form>
          </div>

          {/* Contact Information Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4  order-3">
            <div className="h-10 md:h-12 flex items-center justify-start gap-2 md:gap-3 bg-white rounded-lg px-3 md:px-4 shadow-sm border border-[#DADADA]">
              <Mail className="text-gray-600 size-4 md:size-5" />
              <span className="text-[#2C3E50] text-xs md:text-sm">
                Support@email.com
              </span>
            </div>
            <div className="h-10 md:h-12 flex items-center justify-start gap-2 md:gap-3 bg-white rounded-lg px-3 md:px-4 shadow-sm border border-[#DADADA]">
              <Phone className="text-[#2C3E50] size-4 md:size-5" />
              <span className="text-[#2C3E50] text-xs md:text-sm">
                9200 XXXX
              </span>
            </div>
            <div className="h-10 md:h-12 flex items-center justify-start gap-2 md:gap-3 bg-white rounded-lg px-3 md:px-4 shadow-sm border border-[#DADADA]">
              <MapPin className="text-[#2C3E50] size-4 md:size-5" />
              <span className="text-[#2C3E50] text-xs md:text-sm">
                الرياض، المملكة العربية السعودية
              </span>
            </div>
            <div className="h-10 md:h-12 flex items-center justify-start gap-2 md:gap-3 bg-white rounded-lg px-3 md:px-4 shadow-sm border border-[#DADADA]">
              <Clock className="text-[#2C3E50] size-4 md:size-5" />
              <span className="text-[#2C3E50] text-xs md:text-sm">
                يوميًا من 9 صباحًا إلى 10 مساءً
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Map Section */}
        <div className="w-full lg:w-1/2 h-[250px] sm:h-[300px] md:h-[400px] lg:h-[600px] xl:h-[740px] rounded-lg overflow-hidden border border-[#DADADA] order-2 lg:order-2 mb-4 lg:mb-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/map.png"
              alt="Location Map"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
