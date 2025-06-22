import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";

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
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 text-right"
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {startElement && (
          <div className="absolute w-fit rtl:left-3 ltr:right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
            {startElement}
          </div>
        )}
        <Input
          id={name}
          className={cn(
            "h-12 text-base text-start",
            {
              "ps-12": !!startElement,
              "pe-12": !!endElement,
              "border-red-500 focus-visible:ring-red-500": error,
            },
            className
          )}
          {...props}
        />
        {endElement && (
          <div className="absolute w-fit ltr:left-3 rtl:right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
            {endElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 text-right">{error.message}</p>
      )}
    </div>
  );
}
