import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";
import { motion } from "motion/react";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: FieldError;
  endElement?: React.ReactNode;
  startElement?: React.ReactNode;
}

export function FormField({
  label,
  name,
  error,
  endElement,
  startElement,
  className,
  ...props
}: FormFieldProps) {
  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </motion.label>
      <div className="relative">
        {startElement && (
          <motion.div
            className="absolute w-fit rtl:left-3 ltr:right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {startElement}
          </motion.div>
        )}
        <Input
          id={name}
          className={cn(
            "h-12 text-base text-start transition-all duration-200",
            {
              "ps-12": !!startElement,
              "pe-12": !!endElement,
              "border-red-500 focus:border-red-500 focus:ring-red-500": !!error,
            },
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {endElement && (
          <motion.div
            className="absolute w-fit ltr:left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600"
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
          className="text-sm text-red-500 text-right"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
          }}
        >
          {error.message}
        </motion.p>
      )}
    </motion.div>
  );
}
