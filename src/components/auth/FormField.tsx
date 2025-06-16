import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { FieldError } from "react-hook-form"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: FieldError
  leftElement?: React.ReactNode
}

export function FormField({
  label,
  name,
  error,
  leftElement,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 text-right"
      >
        {label}
      </label>
      <div className="relative">
        <Input
          id={name}
          className={cn(
            "h-12 text-base text-right",
            leftElement && "pl-16",
            error && "border-red-500 focus-visible:ring-red-500",
            className
          )}
          {...props}
        />
        {leftElement && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600">
            {leftElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-red-500 text-right">{error.message}</p>
      )}
    </div>
  )
} 