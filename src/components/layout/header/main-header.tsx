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
} from "lucide-react";

export function MainHeader() {
  const categories = [
    { name: "جميع المنتجات", href: "/categories/all" },
    { name: "العناية بالأم والطفل", href: "/categories/mother-baby" },
    { name: "المكياج والعناية بالجمال", href: "/categories/makeup-beauty" },
    { name: "العناية بالبشرة", href: "/categories/skin-care" },
    { name: "العناية بالشعر", href: "/categories/hair-care" },
    { name: "العناية الشخصية", href: "/categories/personal-care" },
    { name: "الأدوية والعلاجات", href: "/categories/medicines" },
    {
      name: "الفيتامينات والتغذية الصحية",
      href: "/categories/vitamins-nutrition",
    },
  ];

  return (
    <header className="bg-white border-b border-[#DADADA] sticky top-0 z-50 shadow-sm w-full">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Right Section - Logo */}
          <div className="flex-shrink-0 mr-4">
            <Link href="/" className="flex items-center gap-3">
              <SahhaNowArabicLogo />
              <SahhaNowEnglishLogo />
            </Link>
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
                      <Link
                        href={category.href}
                        className="w-full text-right py-2 px-4 hover:bg-gray-50 text-[#2C3E50] text-[16px]"
                      >
                        {category.name}
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
            </div>
          </div>

          {/* Left Section - Action Icons */}
          <div className="flex items-center gap-6 shrink-0 ml-4">
            <ActionButton icon={<Gift className="size-6" />} href="/gifts" />
            <ActionButton
              icon={<ShoppingCart className="size-6" />}
              href="/cart"
              count={0}
            />
            <ActionButton
              icon={<Heart className="size-6" />}
              href="/wishlist"
              count={3}
            />
            {/* <Button variant="ghost" size="icon" className="h-10 w-10 lg:hidden">
              <Menu className="w-6 h-6" />
            </Button> */}
          </div>
        </div>
      </div>
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
    <Button
      asChild
      variant="ghost"
      size="icon"
      className="relative text-[#2C3E50] hover:bg-gray-100"
    >
      <Link href={href}>
        {icon}
        {count !== undefined && count > 0 && (
          <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
            {count}
          </span>
        )}
      </Link>
    </Button>
  );
}

export default MainHeader;
