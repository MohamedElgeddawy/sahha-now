"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { motion } from "motion/react";
import { CreditCard, Shield } from "lucide-react";
import { FormField } from "@components/auth/FormField";
import { type CheckoutFormData } from "@schemas/checkout";

export function CreditCardForm() {
  const { control } = useFormContext<CheckoutFormData>();

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Improved month formatter: only allow 01-12, pad, and auto-focus on valid
  const formatMonth = (value: string) => {
    let v = value.replace(/\D/g, "");
    if (v.length === 1 && v !== "0" && v !== "1") {
      // If user types 2-9, pad with 0 (e.g., 2 -> 02)
      v = "0" + v;
    }
    if (v.length > 2) v = v.slice(0, 2);
    if (v.length === 2) {
      if (parseInt(v, 10) < 1) v = "01";
      if (parseInt(v, 10) > 12) v = "12";
    }
    return v;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Form Fields */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-200">
        <div className="flex items-center gap-2 text-blue-700 mb-1">
          <Shield className="w-3 h-3" />
          <span className="text-xs font-medium">معلومات الدفع آمنة</span>
        </div>
        <p className="text-xs text-blue-600">
          جميع معلومات البطاقة مشفرة ومؤمنة بالكامل
        </p>
      </div>

      <div className="space-y-4">
        {/* Card Number */}
        <Controller
          name="number"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormField
              name="number"
              label="رقم البطاقة"
              placeholder="0000 0000 0000 0000"
              required
              error={error}
              startElement={<CreditCard className="w-4 h-4" />}
              isCardNumber={true}
              autoComplete="off"
              aria-autocomplete="none"
              value={field.value}
              onChange={(e) => {
                const formatted = formatCardNumber(e.target.value);
                field.onChange(formatted);
              }}
              maxLength={19}
            />
          )}
        />

        {/* Responsive Expiry/Card Holder Row */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Expiry Month/Year */}
          <div className="flex *:flex-1 gap-2 w-full md:w-1/2">
            <Controller
              name="month"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormField
                  name="month"
                  label="شهر الانتهاء"
                  placeholder="MM"
                  required
                  type="number"
                  error={error}
                  isCardNumber={true}
                  value={field.value}
                  onChange={(e) => {
                    const formatted = formatMonth(e.target.value);
                    field.onChange(formatted);
                  }}
                  maxLength={2}
                />
              )}
            />
            <Controller
              name="year"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormField
                  name="year"
                  label="سنة الانتهاء"
                  placeholder="YYYY"
                  required
                  type="number"
                  error={error}
                  isCardNumber={true}
                  value={field.value}
                  onChange={field.onChange}
                  maxLength={4}
                />
              )}
            />
          </div>
          {/* Card Holder */}
          <div className="w-full md:w-1/2">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FormField
                  name="name"
                  label="اسم حامل البطاقة"
                  placeholder="الاسم كما يظهر على البطاقة"
                  required
                  error={error}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>

        {/* CVC */}
        <Controller
          name="cvc"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <FormField
              label="رمز الأمان (CVC)"
              placeholder="123"
              required
              error={error}
              startElement={<Shield className="w-4 h-4" />}
              isCardNumber={true}
              type="number"
              autoComplete="off"
              aria-autocomplete="none"
              {...field}
              maxLength={4}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 4) {
                  field.onChange(value);
                }
              }}
            />
          )}
        />
      </div>
    </motion.div>
  );
}
