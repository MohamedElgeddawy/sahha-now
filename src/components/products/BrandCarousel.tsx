import { useFiltersMetadata } from "@/lib/hooks/use-products";
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

export default function BrandCarousel() {
  const { data, isLoading } = useFiltersMetadata();
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
    onSelect();
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const brands = data?.brands || [];

  return (
    <div className="w-full bg-[#F4FBF6] py-8 flex flex-col items-center mt-16 relative">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 w-full px-2 sm:px-4 md:px-8 gap-4 md:gap-0">
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
            disabled={!canScrollNext || isLoading}
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
          <CarouselContent className="-ml-4">
            {brands.map((brand) => (
              <CarouselItem
                key={brand.id}
                className="pl-4 basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
              >
                <div className="flex flex-col items-center bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full min-h-[340px] justify-between">
                  {brand.logoUrl ? (
                    <Image
                      src={brand.logoUrl}
                      alt={brand.arabicName || brand.name}
                      width={120}
                      height={120}
                      className="object-contain mb-4"
                      
                    />
                  ) : (
                    <div className="w-[120px] h-[120px] bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-gray-400 text-4xl font-bold">
                        ?
                      </span>
                    </div>
                  )}
                  <span className="text-2xl font-bold text-[#2d3748] mt-2 text-center">
                    {brand.arabicName || brand.name}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <Link href="/products">
        <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-lg text-lg mt-8">
          تسوق الآن
        </Button>
      </Link>
    </div>
  );
}
