"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/ui/QuantitySelector";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { SizeSelector } from "@/components/ui/SizeSelector";
import { RatingStars } from "@/components/ui/RatingStars";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { Heart } from "lucide-react";

export function ProductInfo() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Temporary data - replace with actual product data
  const product = {
    name: "اسم المنتج",
    price: 199.99,
    oldPrice: 249.99,
    rating: 4.5,
    reviewsCount: 120,
    description: "وصف قصير للمنتج يظهر هنا ويمكن أن يكون في سطرين.",
    colors: [
      { name: "أحمر", value: "#FF0000" },
      { name: "أزرق", value: "#0000FF" },
      { name: "أخضر", value: "#00FF00" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 50,
  };

  const handleAddToCart = () => {
    // Add to cart logic
    console.log("Adding to cart:", {
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  return (
    <div className="space-y-6">
      {/* Title and Rating */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-[#2C3E50]">{product.name}</h1>
        <div className="flex items-center gap-4">
          <RatingStars rating={product.rating} />
          <span className="text-sm text-gray-500">
            ({product.reviewsCount} تقييم)
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-center gap-3">
        <span className="text-2xl font-bold text-green-600">
          {product.price} ج.م
        </span>
        {product.oldPrice && (
          <span className="text-lg text-gray-400 line-through">
            {product.oldPrice} ج.م
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-gray-600">{product.description}</p>

      {/* Color Selection */}
      <div className="space-y-3">
        <span className="block font-medium">اللون</span>
        <div className="flex gap-2">
          {product.colors.map((color) => (
            <ColorSwatch
              key={color.value}
              color={color}
              isSelected={selectedColor === color.value}
              onSelect={() => setSelectedColor(color.value)}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-3">
        <span className="block font-medium">المقاس</span>
        <div className="flex gap-2">
          {product.sizes.map((size) => (
            <SizeSelector
              key={size}
              size={size}
              isSelected={selectedSize === size}
              onSelect={() => setSelectedSize(size)}
            />
          ))}
        </div>
      </div>

      {/* Quantity and Add to Cart */}
      <div className="flex items-center gap-4">
        <QuantitySelector
          quantity={quantity}
          onIncrease={() => setQuantity((q) => Math.min(q + 1, product.stock))}
          onDecrease={() => setQuantity((q) => Math.max(q - 1, 1))}
        />
        <Button
          onClick={handleAddToCart}
          className="flex-1 h-12 bg-green-600 hover:bg-green-700"
        >
          أضف إلى السلة
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 border-gray-200"
        >
          <Heart className="h-6 w-6" />
        </Button>
      </div>

      {/* Share Buttons */}
      <ShareButtons />
    </div>
  );
}
