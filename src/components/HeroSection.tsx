"use client";

import Image from "next/image";
import MotherChildCareIcon from "../../public/icons/home/mother&child-care.svg";
import HairCareIcon from "../../public/icons/home/hair-care.svg";
import MakeupIcon from "../../public/icons/home/makeup.svg";
import PersonalCareIcon from "../../public/icons/home/personal-care.svg";
import SkinCareIcon from "../../public/icons/home/skin-care.svg";
import VitaminIcon from "../../public/icons/home/vitamin.svg";
import MedicineIcon from "../../public/icons/home/medicine.svg";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Link from "next/link";
import { useCategories } from "@/lib/hooks/use-products";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const { data: categories } = useCategories();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const heroCategories = [
     {
      label: "العناية بالأم والطفل",
      icon: MotherChildCareIcon,
      color: "bg-[#FFF5E5]",
    },
    
    {
      label: "المكياج والعناية بالجمال",
      icon: MakeupIcon,
      color: "bg-[#FFE9F0]",
    },
    {
      label: "العناية بالبشرة",
      icon: SkinCareIcon,
      color: "bg-[#E9F9F5]",
    },
    
      {
      label: "العناية بالشعر",
      icon: HairCareIcon,
      color: "bg-[#F3F0FF]",
    },
    {
      label: "العناية الشخصية",
      icon: PersonalCareIcon,
      color: "bg-[#F6F6F6]",
    },
   
    {
      label: "الفيتامينات والتغذية الصحية",
      icon: VitaminIcon,
      color: "bg-[#F1FAE6]",
    },
    {
      label: "الأدوية والعلاجات",
      icon: MedicineIcon,
      color: "bg-[#EAF3FF]",
    },
  ];

  const heroCategoriesWithId = heroCategories.map((cat) => ({
    ...cat,
    id: categories?.categories.find((c) => c.arabicName === cat.label)
      ?.id,
  }));

  // Create overlapping slides
  const slides = [];
  const validCategories = heroCategoriesWithId.filter((cat) => cat.id);

  if (validCategories.length >= 5) {
    // First slide: First 5 categories
    slides.push(validCategories.slice(0, 5));

    // Second slide: Last 3 from first slide + last 2 categories
    if (validCategories.length > 5) {
      slides.push([
        ...validCategories.slice(2, 5),
        ...validCategories.slice(5),
      ]);
    }
  } else if (validCategories.length > 0) {
    // Fallback for less than 5 categories
    slides.push(validCategories);
  }

  return (
    <section className="relative mb-28 md:mb-32 flex flex-col w-full">
      {/* Hero Content */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#f8fafc] rounded-3xl p-6 md:p-12 w-full min-h-[500px] relative">
        {/* Background Image */}
        <Image
          src="/images/hero-image-bg.png"
          alt=""
          fill
          className="object-cover opacity-20 z-0"
        />

        {/* Text Content */}
        <motion.div
          className="relative z-10 flex-1 flex flex-col items-end text-right gap-4 md:pl-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="flex items-center gap-2 text-sm text-gray-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow text-green-600 font-bold">
              <Star className="fill-yellow-400 text-yellow-400 h-4 w-4" /> 4.9
            </span>
            <span>أفضل ١٠ ماركات تجميلية</span>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            قوة وتأثير طبيعي
          </motion.h1>

          <motion.p
            className="text-lg text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            منتجاتنا تحتوي على مكونات طبيعية وخالية من المواد الضارة
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href="/products">
              <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg mt-2">
                اشترى الآن
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className="relative z-10 flex-1 flex items-center justify-start mt-8 md:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/hero-image.png"
            alt="منتجات طبيعية"
            width={350}
            height={350}
            className="drop-shadow-xl"
          />
        </motion.div>
      </div>

      {/* Categories Carousel - positioned like the old version */}
      <motion.div 
        className="md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 md:w-[calc(100%-300px)] 
                  w-full px-4 md:px-0 z-20 mt-16 md:mt-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}>
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            direction: "rtl",
            loop: slides.length > 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {slides.map((slide, slideIndex) => (
              <CarouselItem key={slideIndex} className="pl-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                  {slide.map((cat) => (
                    <Link key={cat.id} href={`/products?categoryIds=${cat.id}`}>
                      <CategoryCard 
                      icon={<Image src={cat.icon} alt={cat.label} width={48} height={48} />}
                        label={cat.label}
                        className={cat.color}
                      />
                    </Link>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Two Circular Indicators */}
        {slides.length > 1 && (
          <div className="flex justify-center gap-3 mt-6">
            {[0, 1].map((index) => (
              <button
                key={index}
                className={cn(
                  "h-3 w-3 rounded-full transition-all",
                  current === index ? "bg-green-600 w-6" : "bg-gray-300"
                )}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

function CategoryCard({
  icon,
  label,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <motion.div
    className={cn(
      `flex flex-col justify-center h-28 md:h-36 items-center bg-white rounded-xl shadow p-3 md:p-4`,
      className
    )}
    whileHover={{
      scale: 1.05,
      boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
      <div className="mb-2">{icon}</div>
      <span className="text-sm md:text-base px-2 md:px-4 text-gray-700 font-medium text-center">
        {label}
      </span>
    </motion.div>
  );
}