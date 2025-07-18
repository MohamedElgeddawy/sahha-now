"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@components/ui/carousel";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

interface Category {
  id: string | undefined;
  label: string;
  icon: string;
  color: string;
}

interface CategoriesCarouselProps {
  categories: Category[];
}

export default function CategoriesCarousel({
  categories,
}: CategoriesCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const validCategories = categories.filter((cat) => cat.id);

  return (
    <motion.div
      className="md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 w-full px-2 sm:px-4 md:px-0 md:w-[calc(100%-64px)] lg:w-[calc(100%-128px)] max-w-4xl z-20 mt-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          direction: "rtl",
          slidesToScroll: isMobile ? 4 : 5,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-6 -mr-2">
          {validCategories.map((cat, slideIndex) => (
            <CarouselItem
              key={cat.id}
              className="pl-2 md:pl-3 basis-1/4 md:basis-1/5"
            >
              <Link href={`/products?categoryIds=${cat.id}`}>
                <CategoryCard
                  icon={
                    <Image
                      src={cat.icon}
                      alt={cat.label}
                      width={40}
                      height={40}
                      className="size-8 sm:size-10 md:size-12 mx-auto"
                    />
                  }
                  label={cat.label}
                  className={cat.color}
                  index={slideIndex}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Two Circular Indicators */}
      {validCategories.length > 1 && (
        <div className="flex justify-center gap-3 mt-2">
          {Array.from(
            { length: Math.ceil(validCategories.length / (isMobile ? 4 : 5)) },
            (_, i) => i
          ).map((index) => (
            <button
              key={index}
              className={cn(
                "h-2.5 w-2.5 md:h-3 md:w-3 rounded-full transition-all",
                current === index ? "bg-green-600 w-5 md:w-6" : "bg-gray-300"
              )}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}

function CategoryCard({
  icon,
  label,
  className,
  index = 0,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      className={cn(
        "flex flex-col justify-center items-center rounded-xl p-3 md:p-4 h-[100px] sm:h-[110px] md:h-[120px] lg:h-[132px] bg-white shadow-sm hover:shadow-lg transition-all",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
    >
      <div className="mb-2 flex items-center justify-center">{icon}</div>
      <span className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 font-medium text-center leading-tight line-clamp-2">
        {label}
      </span>
    </motion.div>
  );
}
