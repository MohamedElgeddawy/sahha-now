import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  size: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function SizeSelector({
  size,
  isSelected,
  onSelect,
}: SizeSelectorProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-12 h-12 rounded-lg border text-sm font-medium",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600",
        isSelected
          ? "border-green-600 bg-green-50 text-green-600"
          : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
      )}
    >
      {size}
    </button>
  );
}
