"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Product } from "@/lib/api/products";
import FavoriteButton from "./FavoriteButton";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCopyToClipboard } from "usehooks-ts";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
interface ProductGalleryProps {
  images: Product["media"] | [];
  discount: string;
  product: Product;
}

export function ProductGallery({
  images,
  discount,
  product,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    images.findIndex((image) => image.isMain)
  );
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [_, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    setSelectedImage(images.findIndex((image) => image.isMain));
  }, [images]);

  // Sync selectedImage with carousel
  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => {
      setSelectedImage(carouselApi.selectedScrollSnap());
    };
    carouselApi.on("select", onSelect);
    // Set initial
    setSelectedImage(carouselApi.selectedScrollSnap());
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  return (
    <>
      <div dir="rtl" className="flex gap-4 items-start">
        {/* Thumbnails on the side */}
        <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto items-center">
          {images.map((image, idx) => (
            <button
              key={`thumb-${idx}`}
              onClick={() => carouselApi && carouselApi.scrollTo(idx)}
              className={cn(
                "relative aspect-square size-16 rounded-lg overflow-hidden border-2 transition-all",
                {
                  "border-green-600 ": selectedImage === idx,
                  "border-gray-100 hover:border-gray-300":
                    selectedImage !== idx,
                }
              )}
              aria-label={`عرض الصورة ${idx + 1}`}
            >
              <Image
                src={image?.thumbnailUrl}
                alt={`Product thumbnail ${idx + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
        <div className="flex-1 relative aspect-square rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center">
          <Carousel
            className="w-full h-full"
            opts={{ loop: true, direction: "rtl" }}
            setApi={setCarouselApi}
          >
            <CarouselContent className="h-full">
              {images.map((image, idx) => (
                <CarouselItem
                  key={image.url || idx}
                  className="flex items-center relative justify-center h-full"
                >
                  <Image
                    src={image.url}
                    alt={`Product image ${idx + 1}`}
                    width={400}
                    height={400}
                    className="object-contain relative z-[1] p-4 select-none"
                    priority
                  />
                  <span className="sr-only">Product image {idx + 1}</span>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          {/* Action Buttons */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <FavoriteButton
              productId={product.id}
              isFavourite={product.isFavourite}
            />
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 bg-white hover:bg-white/90"
              onClick={(e) => {
                copyToClipboard(window.location.href);
                toast.success("لقد تم نسخ الرابط");
              }}
            >
              <Share2 className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
          {/* Discount Badge */}
          {Number(discount) > 0 ? (
            <div className="absolute top-4 right-4 bg-red-50 text-red-600 px-3 py-1 rounded-md text-sm font-medium z-10">
              -{discount}%
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
