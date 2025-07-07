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

  // Determine if variants are colors or sizes based on the presence of colour field and size field
  const hasColorVariants = variants.some((variant) => variant.colour);
  const hasSizeVariants = variants.some((variant) => variant.size);

  // Determine the label based on variant type
  const getVariantLabel = () => {
    if (hasColorVariants) return "لون المنتج:";
    if (hasSizeVariants) return "حجم العبوة:";
    return "";
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">
          {getVariantLabel()}
        </span>
        {selectedVariant && (
          <span className="text-sm text-gray-500">
            {selectedVariant.arabicName}
          </span>
        )}
      </div>

      {/* Variants Row - horizontally scrollable on mobile */}
      <div className="flex flex-row gap-3 overflow-x-auto py-2">
        {variants.map((variant) => {
          const isSelected = selectedVariant?.id === variant.id;
          const isAvailable = variant.isAvailable;

          return (
            <button
              key={variant.id}
              onClick={() => isAvailable && onVariantSelect(variant)}
              disabled={!isAvailable}
              className={cn(
                "flex flex-col items-center min-w-[64px] focus:outline-none group",
                !isAvailable && "opacity-40 cursor-not-allowed"
              )}
              aria-label={`Select ${variant.arabicName}`}
            >
              {/* Color Swatch for color variants */}
              {hasColorVariants && variant.colour ? (
                <div
                  className={cn(
                    "w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-200 relative",
                    isSelected
                      ? "border-white ring-4 ring-blue-500"
                      : "border-gray-200",
                    !isAvailable && "bg-gray-100"
                  )}
                  style={{ backgroundColor: variant.colour }}
                >
                  {/* Unavailable overlay */}
                  {!isAvailable && (
                    <span className="absolute w-8 h-0.5 bg-gray-400 rotate-45 block" />
                  )}
                </div>
              ) : (
                /* Size or other variant types */
                <div
                  className={cn(
                    "px-2 py-2 min-w-[60px] border rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200",
                    isSelected
                      ? "bg-[#2D9CDB] text-white border-transparent"
                      : "bg-[#F6F6F6] text-gray-700 border-transparent",
                    !isAvailable && "bg-gray-100 text-gray-400"
                  )}
                >
                  {variant.arabicName}
                  {/* Unavailable overlay for size variants */}
                  {!isAvailable && (
                    <span className="absolute w-6 h-0.5 bg-gray-400 rotate-45 block" />
                  )}
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
