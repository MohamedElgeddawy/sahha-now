"use client";
import Image from "next/image";
import MotherChildCareIcon from "@icons/home/mother&child-care.svg";
import HairCareIcon from "@icons/home/hair-care.svg";
import MakeupIcon from "@icons/home/makeup.svg";
import PersonalCareIcon from "@icons/home/personal-care.svg";
import SkinCareIcon from "@icons/home/skin-care.svg";
import VitaminIcon from "@icons/home/vitamin.svg";
import MedicineIcon from "@icons/home/medicine.svg";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import Link from "next/link";
import { useCategories } from "@hooks/use-products";
import { useHeroAnnouncements } from "@hooks/use-announcements";
import { useEffect, useState } from "react";
import CategoriesCarousel from "./CategoriesCarousel";

export default function HeroSection() {
  const { data: categories } = useCategories();
  const { data: heroAnnouncements, isLoading: isLoadingHero } =
    useHeroAnnouncements();
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

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
      <CategoriesCarousel
        categories={heroCategoriesWithId.filter((cat) => cat.id)}
      />
    </section>
  );
}
