"use client";

import Image from "next/image";
import MotherChildCareIcon from "../../public/icons/mother&child-care.svg";
import HairCareIcon from "../../public/icons/hair-care.svg";
import MakeupIcon from "../../public/icons/makeup.svg";
import PersonalCareIcon from "../../public/icons/personal-care.svg";
import SkinCareIcon from "../../public/icons/skin-care.svg";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="relative mb-28 flex flex-col md:flex-row items-center justify-between bg-[#f8fafc] rounded-3xl p-12 w-full min-h-[500px]">
      {/* Background Image */}
        <Image
          src="/images/hero-image-bg.png"
          alt=""
          fill
          className="object-cover opacity-20 z-0"
        />

      {/* Text Content */}
      <div className="relative z-10 flex-1 flex flex-col items-start gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>أفضل ماركات تجميلية</span>
          <span className="flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow text-green-600 font-bold">
            4.9 <span className="text-yellow-400">★</span>
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          قوة وتأثير طبيعي
        </h1>
        <p className="text-lg text-gray-700">
          منتجاتنا تحتوي على مكونات طبيعية وخالية من المواد الضارة
        </p>
        <Button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg mt-2">
          اشترى الآن
        </Button>
      </div>
      {/* Hero Image */}
      <div className="relative z-10 flex-1 flex items-center justify-end">
        <Image
          src="/images/hero-image.png"
          alt="منتجات طبيعية"
          width={350}
          height={350}
          className="drop-shadow-xl"
        />
      </div>
      {/* Categories */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[calc(100%-300px)] flex *:flex-1 gap-4 z-20">
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
      </div>
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
    <div
      className={cn(
        `flex flex-col justify-center h-36 items-center bg-white rounded-xl shadow p-4`,
        className
      )}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-base px-10 text-gray-700 font-medium text-center">
        {label}
      </span>
    </div>
  );
}
