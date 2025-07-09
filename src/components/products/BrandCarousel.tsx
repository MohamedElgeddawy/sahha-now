import { useInfiniteBrands } from "@/lib/hooks/use-products";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useIntersectionObserver } from "usehooks-ts";
import { motion } from "motion/react";

function BrandCardSkeleton() {
  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full min-h-[280px] justify-between animate-pulse">
      <div className="w-[120px] h-[120px] bg-gray-200 rounded-full my-auto" />
      <div className="h-6 w-24 bg-gray-200 rounded" />
    </div>
  );
}
const AnimatedBrandCard = motion.create(CarouselItem);

export default function BrandCarousel() {
  const {
    data: brands = [],
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteBrands(10);
  const [api, setApi] = useState<CarouselApi | null>(null);
  const { ref } = useIntersectionObserver({
    threshold: 0.5,
    onChange: (isIntersecting) => {
      if (isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [imgError, setImgError] = useState<{ [id: string]: boolean }>({});

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <div className="w-full py-4 flex flex-col items-center mt-2 relative">
      <div className="absolute top-0 w-screen h-full bg-[#F4FBF6] z-[-1]" />
      <div className="flex flex-row md:justify-between md:items-center mb-2 w-full px-2 sm:px-4 md:px-8 gap-4 md:gap-0">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2d3748] text-center md:text-right flex-1">
          أفضل الماركات... في مكان واحد
        </h2>
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => api?.scrollPrev()}
            disabled={!canScrollPrev || isLoading}
            className={cn(
              "w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-gray-200",
              canScrollPrev && !isLoading
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "opacity-50 cursor-not-allowed text-gray-400"
            )}
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            disabled={(!canScrollNext && !isFetchingNextPage) || isLoading}
            className={cn(
              "w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border border-gray-200",
              canScrollNext && !isLoading
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "opacity-50 cursor-not-allowed text-gray-400"
            )}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setApi}
          opts={{ align: "start", direction: "rtl" }}
          className="w-full"
        >
          <CarouselContent className="-ml-6">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <CarouselItem
                  key={i}
                  className="pl-6 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <BrandCardSkeleton />
                </CarouselItem>
              ))
            ) : brands?.length > 0 ? (
              <>
                {brands?.map((brand) => (
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
                    whileTap={{
                      scale: 0.95,
                      transition: {
                        type: "spring",
                        stiffness: 120,
                        damping: 14,
                      },
                    }}
                    key={brand.id}
                    className="pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                  >
                    <Link
                      href={`/products?brandIds=${brand.id}`}
                      className="flex flex-col items-center bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full min-h-[280px] justify-between relative"
                    >
                      <motion.div
                        initial={{ y: -40, scale: 0.8, opacity: 0 }}
                        animate={{ y: 0, scale: 1.1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 120,
                          damping: 14,
                        }}
                        className="size-[100px] rounded-full flex items-center justify-center my-auto  z-10 shadow-lg"
                      >
                        {brand.logoUrl && !imgError[brand.id] ? (
                          <Image
                            src={brand.logoUrl}
                            alt={brand.arabicName || brand.name}
                            width={120}
                            height={120}
                            className="object-cover"
                            onError={() =>
                              setImgError((err) => ({
                                ...err,
                                [brand.id]: true,
                              }))
                            }
                          />
                        ) : (
                          <span className="text-gray-400 text-4xl font-bold">
                            ?
                          </span>
                        )}
                      </motion.div>
                      <div className="flex flex-col items-center w-full">
                        <span className="text-2xl font-bold text-[#2d3748] mt-2 text-center">
                          {brand.arabicName || brand.name}
                        </span>
                      </div>
                    </Link>
                  </AnimatedBrandCard>
                ))}
                {hasNextPage && (
                  <CarouselItem
                    ref={ref}
                    className="pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                  >
                    {isFetchingNextPage && <BrandCardSkeleton />}
                  </CarouselItem>
                )}
              </>
            ) : (
              <div className="w-full flex items-center justify-center py-16">
                <span className="text-gray-400 text-lg font-bold">
                  لا توجد ماركات متاحة
                </span>
              </div>
            )}
          </CarouselContent>
        </Carousel>
      </div>
      <Link href="/products">
        <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-lg text-lg mt-4">
          تسوق الآن
        </Button>
      </Link>
    </div>
  );
}
