import { Button } from "./button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2 border border-gray-200 rounded-lg p-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="h-8 w-8"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={onIncrease}
        className="h-8 w-8"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
} 