"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useSectionAnnouncements } from "@/lib/hooks/use-announcements";

interface AnnouncementsProps {
  className?: string;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) setMatches(media.matches);
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  return matches;
}

const Announcements = ({ className = "" }: AnnouncementsProps) => {
  const { data, isLoading, error } = useSectionAnnouncements();
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
  const [current, setCurrent] = React.useState(0);

  // Get all left and right section announcements
  const announcements = [
    ...(data?.leftSection || []),
    ...(data?.rightSection || []),
  ];

  // Debug log to check announcements
  console.log("Announcements data:", announcements);

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

  // Responsive: Carousel with dots for mobile/tablet, grid for desktop
  if (isMobile || isTablet) {
    return (
      <div className={`w-full mx-auto px-4 ${className}`}>
        <div className="relative w-full">
          {/* Simplified Carousel */}
          <div className="overflow-hidden relative w-full">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform:
                  announcements.length <= 1
                    ? "none"
                    : `translateX(-${current * 100}%)`,
              }}
            >
              {announcements.map((announcement, index) => (
                <div
                  key={announcement.id}
                  className={`
                    ${announcements.length > 1 ? "w-full" : "w-full"}
                    flex-shrink-0 px-2
                  `}
                >
                  <div className="relative h-[320px] rounded-xl overflow-hidden shadow-lg group bg-gradient-to-r from-blue-50 to-green-50">
                    {/* Image with specified dimensions */}
                    <div
                      className="absolute rounded-lg overflow-hidden shadow-md"
                      style={{
                        top: 64,
                        left: 25,
                        width: 168,
                        height: 188,
                      }}
                    >
                      <Image
                        src={announcement.imageUrl}
                        alt={announcement.title}
                        fill
                        className="object-cover"
                        sizes="168px"
                      />
                    </div>

                    {/* Content */}
                    <div className="absolute right-4 top-12 flex flex-col gap-2 left-[210px] max-w-[calc(100%-210px-1rem)]">
                      <motion.h2
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="font-bold mb-1 leading-tight text-gray-800 text-base sm:text-lg"
                      >
                        {announcement.title}
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mb-2 text-gray-400 text-xs sm:text-sm line-clamp-3"
                      >
                        {announcement.description}
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <Button
                          asChild
                          className="font-semibold rounded-lg shadow-md bg-green-600 text-white hover:bg-green-700 text-xs sm:text-sm px-4 py-2"
                        >
                          <Link href={announcement.redirectUrl}>
                            {announcement.buttonText || "اشترى الآن"}
                          </Link>
                        </Button>
                      </motion.div>
                    </div>

                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-100/50 to-transparent" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Show dots for 2 or more announcements */}
          {announcements.length > 1 && (
            <motion.div
              className="flex items-center justify-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {announcements.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${
                      index === current
                        ? "bg-green-600 w-6"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }
                  `}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Desktop: original grid
  return (
    <div className={`w-full mx-auto px-4 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[280px]">
        {announcements.map((announcement, index) => {
          const isLeftSection = announcement.type === "LEFT_SECTION";
          const isRightSection = announcement.type === "RIGHT_SECTION";

          return (
            <motion.div
              key={announcement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative w-full h-[320px] rounded-xl overflow-hidden shadow-lg group ${
                isRightSection
                  ? "bg-[#FFF5E5]"
                  : "bg-gradient-to-r from-blue-50 to-green-50"
              }`}
            >
              {/* Image on the left */}
              <div className="absolute left-6 top-10 w-[240px] h-[240px] rounded-lg overflow-hidden shadow-md">
                <Image
                  src={announcement.imageUrl}
                  alt={announcement.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="240px"
                />
              </div>

              {/* Content on the right */}
              <div className="absolute right-6 mt-10 max-w-[300px] text-right">
                <motion.h2
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-6 leading-tight ${
                    isRightSection ? "text-gray-800" : "text-gray-800"
                  }`}
                >
                  {announcement.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                  className={`text-base sm:text-xl lg:text-2xl mb-6 sm:mb-8 line-clamp-3 ${
                    isRightSection ? "text-gray-400" : "text-gray-400"
                  }`}
                >
                  {announcement.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                >
                  <Button
                    asChild
                    className={`font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 ${
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
        })}
      </div>
    </div>
  );
};

export default Announcements;
