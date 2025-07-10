"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@components/ui/carousel";
import { cn } from "@utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCardGrid from "./ProductCardGrid";
import type { Product } from "@api/products";
import { motion } from "motion/react";

interface ProductCarouselProps {
  title?: string;
  products: Product[] | undefined;
  className?: string;
  isLoading?: boolean;
}
const AnimatedBrandCard = motion.create(CarouselItem);

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
  }, [isLoading, products, skeletonProducts]);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-0 sm:mb-1 md:mb-2 lg:mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>

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
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4 lg:-ml-6">
          {displayProducts?.map((product) => (
            <AnimatedBrandCard
              initial={{ y: -40, scale: 0.8, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
              }}
              whileHover={{
                scale: 1.05,
                transition: {
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                },
              }}
              key={product.id}
              className="pl-2 sm:pl-3 md:pl-4 lg:pl-6 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/4"
            >
              <ProductCardGrid product={product} isLoading={isLoading} />
            </AnimatedBrandCard>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
