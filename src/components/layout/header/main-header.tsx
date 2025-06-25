"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SahhaNowArabicLogo } from "@/components/layout/icons/brand-logos/SahhaNowArabicLogo";
import { SahhaNowEnglishLogo } from "@/components/layout/icons/brand-logos/SahhaNowEnglishLogo";
import {
  ChevronDown,
  Search,
  Mic,
  Camera,
  Heart,
  ShoppingCart,
  Gift,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useCartItemsCount } from "@/lib/hooks/use-cart";
import {
  useCategories,
  useFavoriteProductsCount,
} from "@/lib/hooks/use-products";

export function MainHeader() {
  const [open, setOpen] = useState(false);
  const cartItemsCount = useCartItemsCount();
  const { data: favoritesCount } = useFavoriteProductsCount();
  const { data: categoriesResponse } = useCategories();

  return (
    <motion.header
      className={`bg-white border-b border-[#DADADA] sticky top-0 z-50 w-full transition-all duration-300 shadow-sm`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Right Section - Logo */}
          <motion.div
            className="flex-shrink-0 mr-0 md:mr-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link prefetch href="/" className="flex items-center gap-3">
              <SahhaNowArabicLogo />
              <SahhaNowEnglishLogo />
            </Link>
          </motion.div>

          {/* Center Section - Search Bar (hidden on mobile) */}
          <div className="hidden md:block flex-1 max-w-[800px]">
            <motion.div
              className="flex h-[48px]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Categories Dropdown */}
              <DropdownMenu dir="rtl">
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-[48px] px-4 border border-[#DADADA] border-l-0 rounded-r-[8px] rounded-l-none flex items-center gap-2 hover:bg-gray-50 text-[16px] text-[#2C3E50] font-medium"
                  >
                    <span>الفئات</span>
                    <ChevronDown className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {categoriesResponse?.categories?.map((category) => (
                    <DropdownMenuItem key={category.id} asChild>
                      <Link
                        prefetch
                        href={`/products?categoryIds=${category.id}`}
                        className="w-full text-right py-2 px-4 hover:bg-gray-50 text-[#2C3E50] text-[16px]"
                      >
                        {category.arabicName}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

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

          {/* Left Section - Action Icons */}
          <motion.div
            className="flex items-center gap-4 md:gap-6 shrink-0 ml-0 md:ml-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <ActionButton icon={<Gift className="size-6" />} href="/gifts" />
            <ActionButton
              icon={<ShoppingCart className="size-6" />}
              href="/cart"
              count={cartItemsCount}
            />
            <ActionButton
              icon={<Heart className="size-6" />}
              href="/favorites"
              count={favoritesCount}
            />
            <div className="block md:hidden">
              <MobileNav
                open={open}
                onOpenChange={setOpen}
                trigger={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-10 text-[#2C3E50]"
                  >
                    <Menu className="size-6" />
                  </Button>
                }
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

function ActionButton({
  icon,
  href,
  count,
}: {
  icon: React.ReactNode;
  href: string;
  count?: number;
}) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      <Button
        asChild
        variant="ghost"
        size="icon"
        className="relative text-[#2C3E50] hover:bg-gray-100 size-9 md:size-10"
      >
        <Link prefetch href={href}>
          {icon}
          {count !== undefined && count > 0 && (
            <motion.span
              className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
            >
              {count}
            </motion.span>
          )}
        </Link>
      </Button>
    </motion.div>
  );
}

export default MainHeader;
