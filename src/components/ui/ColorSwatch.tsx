import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ColorSwatchProps {
  color: {
    name: string;
    value: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export function ColorSwatch({ color, isSelected, onSelect }: ColorSwatchProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-10 h-10 rounded-full relative",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600",
        isSelected && "ring-2 ring-green-600"
      )}
      style={{ backgroundColor: color.value }}
      title={color.name}
    >
      {isSelected && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Check
            className={cn(
              "w-6 h-6",
              /^#([0-9A-F]{3}){1,2}$/i.test(color.value) &&
                parseInt(color.value.slice(1), 16) > 0x7fffff
                ? "text-gray-900"
                : "text-white"
            )}
          />
        </span>
      )}
    </button>
  );
} 