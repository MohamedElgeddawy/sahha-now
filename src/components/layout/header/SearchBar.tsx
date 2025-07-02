import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CategoryResponse } from "@/lib/api/products";
import { Search, Mic, Camera } from "lucide-react";
import { motion } from "motion/react";
import CategoriesFilter from "./CategoriesFilter";
import { useCategories } from "@/lib/hooks/use-products";

interface SearchBarProps {
  variant?: "desktop" | "mobile";
}

export function SearchBar({ variant = "desktop" }: SearchBarProps) {
  const { data: categoriesResponse } = useCategories();

  if (variant === "mobile") {
    return (
      <div className="block md:hidden mt-3 mb-3">
        <form className="flex h-12 w-full rounded-lg overflow-hidden bg-white border border-[#DADADA]">
          {/* Categories Dropdown */}
          <CategoriesFilter categoriesResponse={categoriesResponse} />
          {/* Search Input */}
          <div className="flex-1 flex items-center border-l border-[#DADADA]">
            <input
              type="text"
              placeholder="ابحث عن دواء، منتج أو ماركة"
              className="flex-1 h-full border-0 focus:ring-0 focus:outline-none rounded-none text-xs text-[#2C3E50] placeholder:text-gray-400 py-2 px-2"
              dir="rtl"
            />
            <div className="flex items-center gap-2 px-2 border-r border-[#DADADA]">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 text-[#2C3E50]"
              >
                <Camera className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 p-0 text-[#2C3E50]"
              >
                <Mic className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {/* Search Button */}
          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-r-none rounded-l-lg bg-[#2C3E50] hover:bg-[#243342]"
          >
            <Search className="w-4 h-4 text-white" />
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="hidden md:block flex-1 max-w-[800px]">
      <motion.div
        className="flex h-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* Categories Dropdown */}
        <CategoriesFilter categoriesResponse={categoriesResponse} />

        {/* Search Input */}
        <div className="flex-1 flex items-center border border-[#DADADA] rounded-none">
          <Input
            type="text"
            placeholder="ابحث عن دواء، منتج أو ماركة"
            className="flex-1 h-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none text-[16px] text-[#2C3E50] placeholder:text-gray-400 py-3 px-6"
          />
          <div className="flex items-center gap-4 px-4 border-r border-[#DADADA]">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-[#2C3E50]"
            >
              <Camera className="size-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-[#2C3E50]"
            >
              <Mic className="size-5" />
            </Button>
          </div>
        </div>

        {/* Search Button */}
        <Button
          variant="default"
          size="icon"
          className="size-[48px] rounded-r-none rounded-l-[8px] bg-[#2C3E50] hover:bg-[#243342]"
        >
          <Search className="size-5 text-white" />
        </Button>
      </motion.div>
    </div>
  );
}
