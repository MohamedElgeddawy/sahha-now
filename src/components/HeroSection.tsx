"use client";

import Image from "next/image";
import MotherChildCareIcon from "../../public/icons/mother&child-care.svg";
import HairCareIcon from "../../public/icons/hair-care.svg";
import MakeupIcon from "../../public/icons/makeup.svg";
import PersonalCareIcon from "../../public/icons/personal-care.svg";
import SkinCareIcon from "../../public/icons/skin-care.svg";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative mb-28 md:mb-32 flex flex-col md:flex-row justify-between items-center bg-[#f8fafc] rounded-3xl p-6 md:p-12 w-full min-h-[500px]">
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

      {/* Categories */}
      <motion.div
        className="md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2 md:translate-y-1/2 md:w-[calc(100%-300px)] 
                  grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 z-20 mt-16 md:mt-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <CategoryCard
          icon={<Image src={MotherChildCareIcon} alt="Mother & Child Care" />}
          label="العناية بالأم والطفل"
          className="bg-[#FFF5E5]"
        />
        <CategoryCard
          icon={<Image src={MakeupIcon} alt="Makeup" />}
          label="المكياج والعناية بالجمال"
          className="bg-[#FFE9F0]"
        />
        <CategoryCard
          icon={<Image src={SkinCareIcon} alt="Skin Care" />}
          label="العناية بالبشرة"
          className="bg-[#E9F9F5]"
        />
        <CategoryCard
          icon={<Image src={HairCareIcon} alt="Hair Care" />}
          label="العناية بالشعر"
          className="bg-[#F3F0FF]"
        />
        <CategoryCard
          icon={<Image src={PersonalCareIcon} alt="Personal Care" />}
          label="العناية الشخصية"
          className="bg-[#F6F6F6]"
        />
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
