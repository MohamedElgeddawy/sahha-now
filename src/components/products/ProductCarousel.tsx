"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCardGrid from "./ProductCardGrid";
import type { Product } from "@/lib/api/products";

interface ProductCarouselProps {
  title?: string;
  products: Product[];
  className?: string;
  isLoading?: boolean;
}

export default function ProductCarousel({
  title = "اكتشف منتجات أخرى قد تهمك",
  products,
  className,
  isLoading = false,
}: ProductCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    // Call once to set initial state
    onSelect();

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  // Create skeleton product array for loading state
  const skeletonProducts = Array(4)
    .fill(null)
    .map((_, i) => ({ id: `skeleton-${i}` }));
  const displayProducts = useMemo(() => {
    if (isLoading) return skeletonProducts;
    return products;
  }, [isLoading, products]);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-[#475569]">{title}</h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev || isLoading}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full border border-gray-200",
              canScrollPrev && !isLoading
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "opacity-50 cursor-not-allowed text-gray-400"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext || isLoading}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full border border-gray-200",
              canScrollNext && !isLoading
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "opacity-50 cursor-not-allowed text-gray-400"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          direction: "rtl",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {displayProducts?.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCardGrid product={product} isLoading={isLoading} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
