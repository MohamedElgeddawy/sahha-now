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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@components/ui/drawer";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import { toast } from "sonner";
import { sendContactMessage } from "@api/contactUs";

const questionFormSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون على الأقل حرفين"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z
    .string()
    .regex(/^[0-9]+$/, "رقم الهاتف يجب أن يحتوي على أرقام فقط")
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

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isClient = useIsClient();

  const handleFormSubmit = async (data: QuestionFormData) => {
    try {
      await sendContactMessage({
        ...data,
        phone:
          data.phone && !data.phone.startsWith("+966")
            ? `+966${data.phone}`
            : data.phone || "",
      });
      toast.success("تم إرسال رسالتك بنجاح");
      reset();
      onOpenChange(false);
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال الرسالة");
      console.error(error);
    }
  };

  const FormContent = () => (
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
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
                <span className="text-gray-500 sm:text-sm" dir="ltr">
                  +966
                </span>
              </div>
              <input
                type="tel"
                id="phone"
                {...field}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 ps-12 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="برجاء إدخال رقم هاتفك"
                dir="ltr"
              />
              {fieldState.error && (
                <p className="text-sm text-red-500 mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </div>
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
  );

  if (isClient && isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange} direction="bottom">
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-2xl font-bold text-gray-800">
              ترغب فى طرح سؤال؟
            </DrawerTitle>
            <DrawerDescription className="text-gray-600">
              سنقوم بالرد عليك في أقرب وقت ممكن
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto p-4">
            <FormContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

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

        <div className="p-4">
          <FormContent />
        </div>
      </DialogContent>
    </Dialog>
  );
};
