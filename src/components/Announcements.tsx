"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { motion } from "motion/react";
import { useSectionAnnouncements } from "@hooks/use-announcements";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@components/ui/carousel";

interface AnnouncementsProps {
  className?: string;
}

const Announcements = ({ className = "" }: AnnouncementsProps) => {
  const { data, isLoading, error } = useSectionAnnouncements();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  // Get all left and right section announcements
  const announcements = [
    ...(data?.leftSection || []),
    ...(data?.rightSection || []),
  ];

  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (isLoading) {
    return (
      <div className={`w-full mx-auto px-4 ${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[320px]">
          {Array(2)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="relative w-full h-[320px] rounded-xl overflow-hidden shadow-lg bg-gray-100 animate-pulse"
              >
                <div className="absolute left-6 top-6 w-[240px] h-[270px] bg-gray-200 rounded-lg" />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-48" />
                  <div className="h-4 bg-gray-200 rounded w-32" />
                  <div className="h-10 bg-gray-200 rounded w-24" />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  if (error || announcements.length === 0) {
    return null;
  }

  return (
    <div className={`w-full mx-auto px-2 ${className}`}>
      {/* Mobile & Tablet: Carousel */}
      <div className="block lg:hidden">
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            direction: "rtl",
            loop: announcements.length > 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-3">
            {announcements.map((announcement) => (
              <CarouselItem
                key={announcement.id}
                className="pl-2 md:pl-3 basis-full md:basis-1/2"
              >
                <AnnouncementCard announcement={announcement} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Two dot indicators */}
        {announcements.length > 1 && (
          <div className="flex justify-center gap-3 mt-6">
            {[0, 1].map((index) => (
              <button
                key={index}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  current === index ? "bg-green-600 w-6" : "bg-gray-300"
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: Grid */}
      <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-6">
        {announcements.map((announcement, index) => (
          <AnnouncementCard
            key={announcement.id}
            announcement={announcement}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

const AnnouncementCard = ({
  announcement,
  index = 0,
}: {
  announcement: any;
  index?: number;
}) => {
  const isRightSection = announcement.type === "RIGHT_SECTION";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative w-full h-[200px] md:h-[240px] rounded-xl overflow-hidden shadow-lg group ${
        isRightSection
          ? "bg-[#FFF5E5]"
          : "bg-gradient-to-r from-blue-50 to-green-50"
      }`}
    >
      {/* Mobile Title (above image) */}
      <div className="md:hidden w-56 absolute top-4 right-4 left-4 z-10">
        <motion.h2
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="text-lg font-bold leading-tight line-clamp-2 text-gray-800 text-right"
        >
          {announcement.title}
        </motion.h2>
      </div>

      {/* Image - Adjusted for mobile */}
      <div
        className="absolute md:left-6 md:top-4 md:w-[240px] md:h-[200px] rounded-lg overflow-hidden shadow-md
                     left-4 top-12 w-[168px] h-[140px]"
      >
        <Image
          src={announcement.imageUrl}
          alt={announcement.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 168px, 240px"
        />
      </div>

      {/* Content Area - Adjusted for mobile */}
      <div
        className="absolute md:right-6 md:top-10 md:max-w-[300px] md:text-right
                     right-4 top-18 left-[200px] text-right"
      >
        {/* Desktop Title */}
        <motion.h2
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          className="hidden md:block text-lg md:text-xl lg:text-xl font-bold mb-4 lg:mb-6 leading-tight line-clamp-2 text-gray-800"
        >
          {announcement.title}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          className="text-base md:text-base lg:text-xl mb-6 md:mb-6 line-clamp-3 text-gray-400"
        >
          {announcement.description}
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          className="flex justify-start mt-4 md:mt-0"
        >
          <Button
            asChild
            className={`font-semibold h-10 md:h-12 md:w-auto px-6 py-0 md:py-3 text-sm md:text-base rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 ${
              isRightSection
                ? "bg-[#F4A261] text-white hover:bg-gray-100"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            <Link href={announcement.redirectUrl}>
              {isRightSection
                ? "اكتشف المزيد"
                : announcement.buttonText || "اشترى الآن"}
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Decorative corner accent */}
      <div
        className={`absolute top-0 right-0 w-20 h-20 ${
          isRightSection
            ? "bg-gradient-to-bl from-white/20 to-transparent"
            : "bg-gradient-to-bl from-green-100/50 to-transparent"
        }`}
      />
    </motion.div>
  );
};

export default Announcements;
