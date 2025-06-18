"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex gap-4">
      {/* Thumbnail Grid */}
      <div className="flex flex-col gap-2 w-20">
        {images.map((image, index) => (
          <button
            key={`thumb-${index}`}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "relative aspect-square rounded-lg overflow-hidden bg-white border",
              selectedImage === index
                ? "border-green-600"
                : "border-gray-100 hover:border-gray-200"
            )}
          >
            <Image
              src={image}
              alt={`Product thumbnail ${index + 1}`}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 relative aspect-square rounded-lg overflow-hidden bg-white border border-gray-100">
        <Image
          src={images[selectedImage]}
          alt="Product image"
          fill
          className="object-contain p-4"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Action Buttons */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 bg-white hover:bg-white/90"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart
              className={cn("h-5 w-5", {
                "fill-red-500 text-red-500": isLiked,
                "text-gray-600": !isLiked,
              })}
            />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 bg-white hover:bg-white/90"
          >
            <Share2 className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
        {/* Discount Badge */}
        <div className="absolute top-4 right-4 bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm font-medium">
          -15%
        </div>
      </div>
    </div>
  );
}
