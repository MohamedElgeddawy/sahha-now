"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "@/lib/mock-data";

interface ProductCarouselProps {
  title?: string;
  products: Product[];
  className?: string;
}

export default function ProductCarousel({
  title = "اكتشف منتجات أخرى قد تهمك",
  products,
  className,
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

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium text-[#475569]">{title}</h2>

        <div className="flex items-center gap-2">
          <button
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full border border-gray-200",
              canScrollPrev
                ? "hover:bg-gray-50 text-gray-600"
                : "opacity-50 cursor-not-allowed text-gray-400"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            disabled={!canScrollNext}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full border border-gray-200",
              canScrollNext
                ? "hover:bg-gray-50 text-gray-600"
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
          loop: true,
          direction: "rtl",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <ProductCard product={product} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}