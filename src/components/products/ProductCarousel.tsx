"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  title: string;
  arabicTitle: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
}

interface ProductCarouselProps {
  title?: string;
  products: Product[];
  className?: string;
}

export default function ProductCarousel({
  title,
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
    <div className={cn("w-full p-4", className)}>
      {title && (
        <div className="flex justify-between items-center mb-6 px-4">
          <h2 className="text-2xl font-bold text-slate-700">{title}</h2>

          <div className="flex space-x-1">
            <Button
              size={"icon"}
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              className={cn(
                "size-8 cursor-pointer rounded-full flex items-center justify-center",
                canScrollPrev
                  ? "bg-green-600 text-white"
                  : "bg-white text-slate-400 border border-gray-200"
              )}
            >
              <ChevronRight />
            </Button>
            <Button
              size={"icon"}
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              className={cn(
                "size-8 cursor-pointer rounded-full flex items-center justify-center",
                canScrollNext
                  ? "bg-green-600 text-white"
                  : "bg-white text-slate-400 border border-gray-200"
              )}
            >
              <ChevronLeft />
            </Button>
          </div>
        </div>
      )}

      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          direction: "rtl",
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5 pe-4 ps-0"
            >
              <ProductCard {...{ product }} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
