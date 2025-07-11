"use client";
import Image from "next/image";
import MotherChildCareIcon from "@icons/home/mother&child-care.svg";
import HairCareIcon from "@icons/home/hair-care.svg";
import MakeupIcon from "@icons/home/makeup.svg";
import PersonalCareIcon from "@icons/home/personal-care.svg";
import SkinCareIcon from "@icons/home/skin-care.svg";
import VitaminIcon from "@icons/home/vitamin.svg";
import MedicineIcon from "@icons/home/medicine.svg";
import { cn } from "@utils";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import Link from "next/link";
import { useCategories } from "@hooks/use-products";
import { useHeroAnnouncements } from "@hooks/use-announcements";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@components/ui/carousel";
import { useEffect, useState } from "react";

// Simple useMediaQuery hook
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

export default function HeroSection() {
  const { data: categories } = useCategories();
  const { data: heroAnnouncements, isLoading: isLoadingHero } =
    useHeroAnnouncements();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Responsive: detect if mobile (max-width: 767px)
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-rotate hero announcements every 5 seconds
  useEffect(() => {
    if (!heroAnnouncements || heroAnnouncements.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroAnnouncements.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [heroAnnouncements]);

  // Get the current active hero announcement
  const heroAnnouncement = heroAnnouncements?.[currentHeroIndex];

  // Fallback content when no hero announcement is available
  const fallbackContent = {
    title: "قوة وتأثير طبيعي",
    description: "منتجاتنا تحتوي على مكونات طبيعية وخالية من المواد الضارة",
    buttonText: "اشترى الآن",
    redirectUrl: "/products",
    imageUrl: "/images/hero-image.png",
  };

  // Use announcement data or fallback
  const heroContent = heroAnnouncement || fallbackContent;

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
    id: categories?.categories.find((c) => c.arabicName === cat.label)?.id,
  }));

  // Responsive slides: custom overlapping for desktop and mobile
  const validCategories = heroCategoriesWithId.filter((cat) => cat.id);
  const slides: any[][] = [];
  if (isMobile) {
    // Mobile: [0,1,2,3], [3,4,5,6]
    if (validCategories.length >= 4) {
      slides.push(validCategories.slice(0, 4));
      if (validCategories.length > 3) {
        slides.push(validCategories.slice(3, 7));
      }
    } else if (validCategories.length > 0) {
      slides.push(validCategories);
    }
  } else {
    // Desktop: [0,1,2,3,4], [2,3,4,5,6]
    if (validCategories.length >= 5) {
      slides.push(validCategories.slice(0, 5));
      if (validCategories.length > 4) {
        slides.push(validCategories.slice(2, 7));
      }
    } else if (validCategories.length > 0) {
      slides.push(validCategories);
    }
  }

  return (
    <section className="relative mb-6 md:mb-10 lg:mb-26 flex flex-col w-full">
      {/* Hero Content */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-[#f8fafc] rounded-3xl p-3 sm:p-4 md:p-8 lg:p-12 w-full min-h-[300px] md:min-h-[450px] lg:min-h-[500px] relative overflow-hidden border border-gray-100">
        {/* Background Image/Pattern */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.18 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/images/hero-image-bg.png"
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          key={`hero-content-${currentHeroIndex}`}
          className="relative z-10 flex-1 flex flex-col items-start text-right gap-2 sm:gap-3 md:gap-4 lg:gap-6 md:pl-4 lg:pl-8 w-full md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <motion.div
            className="flex items-center gap-1 md:gap-2 text-xs sm:text-sm md:text-base text-gray-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-md text-green-600 font-bold border border-gray-100">
              <Star className="fill-yellow-400 text-yellow-400 h-3 w-3 md:h-4 md:w-4" />
              4.9
            </span>
            <span className="font-medium">أفضل ١٠ ماركات تجميلية</span>
          </motion.div>

          {/* Dynamic Headline */}
          <motion.h1
            className="text-lg sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {isLoadingHero ? (
              <div className="h-12 bg-gray-200 rounded animate-pulse" />
            ) : (
              heroContent.title
            )}
          </motion.h1>

          {/* Dynamic Subheadline */}
          <motion.p
            className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-700 w-full font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {isLoadingHero ? (
              <span className="h-6 block w-full bg-gray-200 rounded animate-pulse" />
            ) : (
              heroContent.description
            )}
          </motion.p>

          {/* Dynamic CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className=""
          >
            {isLoadingHero ? (
              <div className="w-[99px] h-[40px] bg-gray-200 rounded-lg animate-pulse" />
            ) : (
              <Link href={heroContent.redirectUrl}>
                <Button className="bg-green-500 hover:bg-green-600 text-white  rounded-lg text-sm sm:text-base md:text-lg mb-2 w-[120px] h-[40px] transition-colors duration-200 shadow-md flex items-center justify-center">
                  {heroContent.buttonText || "اشترى الآن"}
                </Button>
              </Link>
            )}
          </motion.div>
        </motion.div>

        {/* Dynamic Hero Image */}
        <motion.div
          key={`hero-image-${currentHeroIndex}`}
          className="relative z-10 flex-1 flex items-center justify-center md:justify-end mb-6 md:mb-0 w-full md:w-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          {isLoadingHero ? (
            <div className="w-[240px] sm:w-[240px] md:w-[260px] lg:w-[340px] xl:w-[200px] h-[220px] sm:h-[200px] md:h-[260px] lg:h-[340px] xl:h-[380px] bg-gray-200 rounded-lg animate-pulse" />
          ) : (
            <Image
              src={heroContent.imageUrl}
              alt={heroContent.title}
              width={380}
              height={380}
              className="drop-shadow-xl w-[180px] sm:w-[180px] md:w-[260px] lg:w-[340px] xl:w-[380px]"
              priority
            />
          )}
        </motion.div>
      </div>

      {/* Categories Carousel */}
      <motion.div
        className="md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 w-full px-2 sm:px-4 md:px-0 md:w-[calc(100%-64px)] lg:w-[calc(100%-128px)] max-w-4xl z-20 mt-0 "
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            direction: "rtl",
            loop: slides.length > 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-6 -mr-2">
            {slides.map((slide, slideIndex) => (
              <CarouselItem key={slideIndex} className="pl-2 md:pl-3">
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3 lg:gap-4">
                  {slide.map((cat, index) => (
                    <Link key={cat.id} href={`/products?categoryIds=${cat.id}`}>
                      <CategoryCard
                        icon={
                          <Image
                            src={cat.icon}
                            alt={cat.label}
                            width={40}
                            height={40}
                            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto"
                          />
                        }
                        label={cat.label}
                        className={cat.color}
                        index={index}
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
          <div className="flex justify-center gap-3 mt-2">
            {[0, 1].map((index) => (
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
    </section>
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
        "flex flex-col justify-center items-center rounded-xl p-3 md:p-4 h-[100px] sm:h-[110px] md:h-[120px] lg:h-[132px]  bg-white shadow-sm hover:shadow-lg transition-all",
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
