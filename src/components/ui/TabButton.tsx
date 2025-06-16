import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface TabButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

export function TabButton({
  children,
  isActive,
  className,
  ...props
}: TabButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "px-4 py-2 font-medium text-sm relative",
        "focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2",
        isActive
          ? "text-green-600 after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-0.5 after:bg-green-600"
          : "text-gray-500 hover:text-gray-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
} 