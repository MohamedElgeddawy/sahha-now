import Link from "next/link";
import { Search, Mic, Camera, ChevronDown, Heart, ShoppingCart, Gift, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Container } from "@/components/layout/container";
import { SahhaNowArabicLogo } from "@/components/layout/icons/brand-logos/SahhaNowArabicLogo";
import { SahhaNowEnglishLogo } from "@/components/layout/icons/brand-logos/SahhaNowEnglishLogo";
import { CartIcon } from "@/components/layout/icons/main-header-icons/CartIcon";
import { GiftIcon } from "@/components/layout/icons/main-header-icons/GiftIcon";
import { WishlistIcon } from "@/components/layout/icons/main-header-icons/WishlistIcon";
import { SearchIcon } from "@/components/layout/icons/main-header-icons/SearchIcon";
import { MicrophoneIcon } from "@/components/layout/icons/main-header-icons/MicrophoneIcon";
import { ImageSearchIcon } from "@/components/layout/icons/main-header-icons/ImageSearchIcon";
import { ChevronDownIcon } from "@/components/layout/icons/main-header-icons/ChevronDownIcon";
import { MenuIcon } from "@/components/layout/icons/main-header-icons/MenuIcon";

export function MainHeader() {
  const categories = [
    { name: "جميع المنتجات", href: "/categories/all" },
    { name: "العناية بالأم والطفل", href: "/categories/mother-baby" },
    { name: "المكياج والعناية بالجمال", href: "/categories/makeup-beauty" },
    { name: "العناية بالبشرة", href: "/categories/skin-care" },
    { name: "العناية بالشعر", href: "/categories/hair-care" },
    { name: "العناية الشخصية", href: "/categories/personal-care" },
    { name: "الأدوية والعلاجات", href: "/categories/medicines" },
    { name: "الفيتامينات والتغذية الصحية", href: "/categories/vitamins-nutrition" },
  ];

  return (
    <header className="bg-white border-b border-[#DADADA] sticky top-0 z-50 shadow-sm" dir="rtl">
      <Container className="!bg-white !min-h-0">
        <div className="h-20 flex items-center justify-between">
          {/* Right Section - Logo */}
          <div className="flex-shrink-0 mr-4">
            <a href="/" className="flex items-center gap-3">
              <SahhaNowArabicLogo />
              <SahhaNowEnglishLogo />
            </a>
          </div>

          {/* Center Section - Search Bar */}
          <div className="flex-1 max-w-[800px]">
            <div className="flex h-[48px]">
              {/* Categories Dropdown */}
              <DropdownMenu>
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
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.href} asChild>
                      <a 
                        href={category.href}
                        className="w-full text-right py-2 px-4 hover:bg-gray-50 text-[#2C3E50] text-[16px]"
                      >
                        {category.name}
                      </a>
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
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#2C3E50]">
                    <Camera className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-[#2C3E50]">
                    <Mic className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Search Button */}
              <Button 
                variant="default" 
                size="icon"
                className="h-[48px] w-[48px] rounded-r-none rounded-l-[8px] bg-[#2C3E50] hover:bg-[#243342]"
              >
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Left Section - Action Icons */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <ActionButton icon={<Gift />} href="/gifts" />
            <ActionButton icon={<ShoppingCart />} href="/cart" count={2} />
            <ActionButton icon={<Heart />} href="/wishlist" count={5} />
            
            <Button variant="ghost" size="sm" className="md:hidden text-[#2C3E50]">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Container>
    </header>
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
    <Button asChild variant="ghost" size="icon" className="relative h-12 w-12">
      <a href={href}>
        {icon}
        {count !== undefined && count > 0 && (
          <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
            {count}
          </span>
        )}
      </a>
    </Button>
  );
}

export default MainHeader;