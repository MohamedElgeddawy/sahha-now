import React from "react";
import { useMediaQuery } from "usehooks-ts";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@components/ui/drawer";
import { Button } from "@components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  CategoryFilterSection,
  BrandFilterSection,
  ConnectedRatingFilterSection,
} from "./ConnectedFilterSection";
import { motion } from "motion/react";

interface FilterDrawerProps {
  children?: React.ReactNode;
}

export function FilterDrawer({ children }: FilterDrawerProps) {
  const isMobile = useMediaQuery("(max-width: 1024px)"); // lg breakpoint

  const filterContent = (
    <div className="space-y-6">
      <CategoryFilterSection />
      <BrandFilterSection />
      <ConnectedRatingFilterSection />
    </div>
  );

  if (isMobile) {
    return <div className="w-full">{children}</div>;
  }

  // Desktop: Show filters in sidebar
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Desktop Filters Sidebar */}
      <motion.div
        className="lg:w-1/4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {filterContent}
      </motion.div>

      {/* Content */}
      <div className="lg:w-3/4">{children}</div>
    </div>
  );
}

// Export the mobile filter trigger separately
export function MobileFilterTrigger() {
  const isMobile = useMediaQuery("(max-width: 1024px)"); // lg breakpoint

  if (!isMobile) return null;

  const filterContent = (
    <div className="space-y-6">
      <CategoryFilterSection />
      <BrandFilterSection />
      <ConnectedRatingFilterSection />
    </div>
  );

  return (
    <Drawer direction="bottom">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersHorizontal />
          <span className="sr-only">الفلاتر</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh] bg-white">
        <DrawerHeader className="border-b border-gray-500 pb-4">
          <DrawerTitle className="text-lg text-start font-medium text-[#2C3E50]">
            التصفية بـــ:{" "}
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4" dir="rtl">
          {filterContent}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
