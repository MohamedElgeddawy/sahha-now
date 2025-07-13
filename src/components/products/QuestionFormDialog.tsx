"use client";

import React, { Dispatch, SetStateAction } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@components/ui/dialog";
import { toast } from "sonner";
import { sendContactMessage } from "@api/contactUs";

const questionFormSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z
    .string()
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "رقم الهاتف غير صحيح")
    .optional()
    .or(z.literal("")),
  message: z.string().min(10, "الرسالة يجب أن تكون على الأقل 10 أحرف"),
});

type QuestionFormData = z.infer<typeof questionFormSchema>;

interface QuestionFormDialogProps {
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export const QuestionFormDialog = ({
  isOpen,
  onOpenChange,
}: QuestionFormDialogProps) => {
  const { control, handleSubmit, formState, reset } = useForm<QuestionFormData>(
    {
      resolver: zodResolver(questionFormSchema),
      mode: "all",
      defaultValues: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
    }
  );

  const handleFormSubmit = async (data: QuestionFormData) => {
    try {
      await sendContactMessage({
        ...data,
        phone: data.phone || "",
      });
      toast.success("تم إرسال رسالتك بنجاح");
      reset();
      onOpenChange(false);
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال الرسالة");
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-gray-800 md:text-3xl">
            ترغب فى طرح سؤال؟
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            سنقوم بالرد عليك في أقرب وقت ممكن
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-2 text-start"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                الاسم<span className="text-red-500">*</span>
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      type="text"
                      id="name"
                      {...field}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="برجاء إدخال الاسم"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                البريد الإلكتروني<span className="text-red-500">*</span>
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      type="email"
                      id="email"
                      {...field}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="برجاء إدخال البريد الإلكتروني"
                    />
                    {fieldState.error && (
                      <p className="text-sm text-red-500 mt-1">
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              رقم هاتف
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <input
                    type="tel"
                    id="phone"
                    {...field}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="برجاء إدخال رقم هاتفك"
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              الرسالة<span className="text-red-500">*</span>
            </label>
            <Controller
              name="message"
              control={control}
              render={({ field, fieldState }) => (
                <>
                  <textarea
                    id="message"
                    rows={4}
                    {...field}
                    className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="برجاء إدخال رسالتك"
                  />
                  {fieldState.error && (
                    <p className="text-sm text-red-500 mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full rounded-lg bg-green-500 py-2.5 text-base text-white hover:bg-green-600 transition-colors duration-200"
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                جاري الإرسال...
              </span>
            ) : (
              "إرسال"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
