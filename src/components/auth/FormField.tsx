import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";
import { motion } from "motion/react";
import { forwardRef } from "react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: FieldError;
  endElement?: React.ReactNode;
  startElement?: React.ReactNode;
  isCardNumber?: boolean;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      name,
      error,
      endElement,
      startElement,
      className,
      isCardNumber = false,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.label
          htmlFor={name}
          className="block text-sm font-semibold text-gray-800 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {label}{" "}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </motion.label>
        <div className="relative group">
          {startElement && (
            <motion.div
              className="absolute w-fit rtl:left-4 ltr:right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {startElement}
            </motion.div>
          )}
          <Input
            ref={ref}
            id={name}
            className={cn(
              "h-14 text-base text-start transition-all duration-300 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500/20 group-hover:border-gray-300",
              {
                "ps-14": !!startElement,
                "pe-14": !!endElement,
                "border-red-500 focus:border-red-500 focus:ring-red-500/20":
                  !!error,
                "text-left dir-ltr": isCardNumber,
              },
              className
            )}
            aria-invalid={!!error}
            dir={isCardNumber ? "ltr" : undefined}
            {...props}
          />
          {endElement && (
            <motion.div
              className="absolute w-fit ltr:left-4 rtl:right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {endElement}
            </motion.div>
          )}
        </div>
        {error && (
          <motion.p
            className="text-sm text-red-500 text-right flex items-center gap-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          >
            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
            {error.message}
          </motion.p>
        )}
      </motion.div>
    );
  }
);

FormField.displayName = "FormField";
