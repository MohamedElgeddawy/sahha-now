"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ProductVariant } from "@/lib/api/products";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onVariantSelect: (variant: ProductVariant) => void;
  className?: string;
}

export function VariantSelector({
  variants,
  selectedVariant,
  onVariantSelect,
  className,
}: VariantSelectorProps) {
  if (!variants || variants.length === 0) {
    return null;
  }

  // Determine if variants are colors or sizes based on variant names
  const isColorVariant = variants.some(
    (variant) =>
      variant.arabicName.includes("أحمر") ||
      variant.arabicName.includes("أزرق") ||
      variant.arabicName.includes("أخضر") ||
      variant.arabicName.includes("أسود") ||
      variant.arabicName.includes("أبيض") ||
      variant.arabicName.includes("لون") ||
      variant.name.toLowerCase().includes("red") ||
      variant.name.toLowerCase().includes("blue") ||
      variant.name.toLowerCase().includes("green") ||
      variant.name.toLowerCase().includes("black") ||
      variant.name.toLowerCase().includes("white") ||
      variant.name.toLowerCase().includes("color")
  );

  const isSizeVariant = variants.some(
    (variant) =>
      variant.arabicName.includes("صغير") ||
      variant.arabicName.includes("متوسط") ||
      variant.arabicName.includes("كبير") ||
      variant.arabicName.includes("مقاس") ||
      variant.name.toLowerCase().includes("small") ||
      variant.name.toLowerCase().includes("medium") ||
      variant.name.toLowerCase().includes("large") ||
      variant.name.toLowerCase().includes("size") ||
      /^(XS|S|M|L|XL|XXL|\d+)$/i.test(variant.name)
  );

  const variantType = isColorVariant
    ? "color"
    : isSizeVariant
    ? "size"
    : "variant";
  const labelText =
    variantType === "color"
      ? "اللون:"
      : variantType === "size"
      ? "المقاس:"
      : "الخيارات:";

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">{labelText}</span>
        {selectedVariant && (
          <span className="text-sm text-gray-500">
            {selectedVariant.arabicName}
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = selectedVariant?.id === variant.id;
          const isAvailable = variant.isAvailable;

          return (
            <button
              key={variant.id}
              onClick={() => isAvailable && onVariantSelect(variant)}
              disabled={!isAvailable}
              className={cn(
                "relative min-w-[60px] px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-200",
                "focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
                {
                  // Selected state
                  "border-green-600 bg-green-50 text-green-700 ring-2 ring-green-600":
                    isSelected && isAvailable,

                  // Available but not selected
                  "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50":
                    !isSelected && isAvailable,

                  // Unavailable
                  "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed":
                    !isAvailable,

                  // Color variant specific styling
                  "w-12 h-12 rounded-full p-0": variantType === "color",

                  // Size variant specific styling
                  "min-w-[50px] h-10": variantType === "size",
                }
              )}
              aria-label={`Select ${variant.arabicName}`}
            >
              {variantType === "color" ? (
                <div className="w-full h-full rounded-full border-2 border-white shadow-inner" />
              ) : (
                <span className="block text-center">{variant.arabicName}</span>
              )}

              {/* Unavailable overlay */}
              {!isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-gray-400 rotate-45" />
                </div>
              )}

              {/* Price difference indicator */}
              {selectedVariant && variant.id !== selectedVariant.id && (
                <div className="absolute -top-1 -right-1 text-xs bg-gray-600 text-white px-1 rounded">
                  {Number(variant.price) > Number(selectedVariant.price)
                    ? "+"
                    : ""}
                  {(
                    Number(variant.price) - Number(selectedVariant.price)
                  ).toFixed(2)}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Variant details */}
      {/* {selectedVariant && (
        <div className="text-xs text-gray-500 space-y-1">
          <div>رقم المنتج: {selectedVariant.sku}</div>
          {Number(selectedVariant.discount) > 0 && (
            <div className="text-red-600">خصم {selectedVariant.discount}%</div>
          )}
        </div>
      )} */}
    </div>
  );
}
