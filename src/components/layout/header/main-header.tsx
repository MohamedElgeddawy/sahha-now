"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";


import { SahhaNowArabicLogo } from "@/components/layout/icons/brand-logos/SahhaNowArabicLogo";
import { SahhaNowEnglishLogo } from "@/components/layout/icons/brand-logos/SahhaNowEnglishLogo";
import {
  Heart,
  ShoppingCart,
  Gift,
  Menu,
  UserRound,
  UserPlus,
} from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useCartItemsCount } from "@/lib/hooks/use-cart";
import {
  useFavoriteProductsCount,
} from "@/lib/hooks/use-products";
import { useIsClient } from "usehooks-ts";
import { useAppSelector } from "@/lib/redux/hooks";
import { selectIsAuthenticated } from "@/lib/redux/slices/authSlice";
import { SearchBar } from "./SearchBar";

export function MainHeader() {
  const [open, setOpen] = useState(false);
  const cartItemsCount = useCartItemsCount();
  const { data: favoritesCount } = useFavoriteProductsCount();
  const isClient = useIsClient();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

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
              <span className="size-10 md:size-12 flex items-center">
                <SahhaNowArabicLogo />
              </span>
              <span className="w-20 h-12 md:size-18 flex items-center">
                <SahhaNowEnglishLogo />
              </span>
            </Link>
          </motion.div>

          {/* Center Section - Search Bar (hidden on mobile) */}
          <SearchBar variant="desktop" />

          {/* Left Section - Action Icons */}
          <motion.div
            className="flex items-center gap-2 md:gap-4 shrink-0 ml-0 md:ml-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <ActionButton
              icon={<Gift className="size-5 md:size-6" />}
              href="/account/points"
            />
            <ActionButton
              icon={<ShoppingCart className="size-5 md:size-6" />}
              href="/cart"
              count={cartItemsCount}
            />
            <ActionButton
              icon={<Heart className="size-5 md:size-6" />}
              href="/favorites"
              count={favoritesCount}
            />
            {/* Account Icon */}
            {isClient && (
              <span className="hidden md:inline-flex">
                <ActionButton
                  icon={
                    isAuthenticated ? (
                      <UserRound className="size-6" />
                    ) : (
                      <UserPlus className="size-6" />
                    )
                  }
                  href={isAuthenticated ? "/account" : "/auth/login"}
                />
              </span>
            )}
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
                    <Menu className="size-5 md:size-6" />
                  </Button>
                }
              />
            </div>
          </motion.div>
        </div>
        {/* Mobile Search Bar */}
        <SearchBar variant="mobile" />
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
