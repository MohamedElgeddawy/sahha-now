import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  X,
  ChevronDown,
  ChevronUp,
  MapPin,
  Phone,
  ChevronRight,
  User,
  Download,
  Globe,
  Search,
  Mic,
  Camera,
  LanguagesIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SahhaNowArabicLogo } from "./icons/brand-logos/SahhaNowArabicLogo";
import { SahhaNowEnglishLogo } from "./icons/brand-logos/SahhaNowEnglishLogo";

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}

export function MobileNav({ open, onOpenChange, trigger }: MobileNavProps) {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const categories = [
    {
      title: "الفئات",
      links: [
        "الأدوية",
        "العناية الشخصية",
        "الأجهزة الطبية",
        "الفيتامينات والمكملات",
        "العروض",
      ],
    },
    {
      title: "حسابي",
      links: ["تسجيل الدخول", "إنشاء حساب", "المفضلة", "الطلبات"],
    },
    {
      title: "المساعدة",
      links: [
        "تواصل معنا",
        "الأسئلة الشائعة",
        "سياسة الخصوصية",
        "الشروط والأحكام",
      ],
    },
  ];

  const toggleCategory = (index: number) => {
    setExpandedCategories((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  function MenuItem({
    icon,
    label,
    href,
    onClick,
  }: {
    icon: React.ReactNode;
    label: string;
    href: string;
    onClick?: (e: React.MouseEvent) => void;
  }) {
    return (
      <Link
        href={href}
        className="flex items-center justify-between py-3 text-[#2C3E50] text-lg"
        onClick={onClick}
      >
        <ChevronRight className="size-5 text-gray-400" />
        <div className="flex items-center gap-3">
          <span>{label}</span>
          <div className="text-gray-500">{icon}</div>
        </div>
      </Link>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="left">
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent className="h-full !w-full bg-white">
        {/* Side Menu Header */}
        <div className="flex items-center justify-between p-4">
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-gray-500"
            >
              <X className="w-6 h-6" />
            </Button>
          </DrawerClose>
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center">
                <SahhaNowArabicLogo />
                <SahhaNowEnglishLogo />
              </div>
            </div>
          </div>
          <div className="w-10"></div> {/* Empty div for spacing */}
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="flex h-[56px] rounded-md overflow-hidden border border-gray-200">
            <Button
              variant="default"
              size="icon"
              className="h-[56px] w-[56px] rounded-r-none bg-[#2C3E50] hover:bg-[#243342]"
            >
              <Search className="size-5 text-white" />
            </Button>

            <div className="flex-1 flex items-center">
              <Input
                type="text"
                placeholder="ابحث"
                className="flex-1 h-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-right"
              />
            </div>

            <div className="flex items-center px-3 border-r border-gray-200">
              <Mic className="size-5 text-gray-500" />
            </div>

            <div className="flex items-center px-3 border-r border-gray-200">
              <Camera className="size-5 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="px-4 space-y-6">
          <MenuItem
            icon={<User className="size-5" />}
            label="حسابي"
            href="/account"
            onClick={() => onOpenChange(false)}
          />

          <MenuItem
            icon={<MapPin className="size-5" />}
            label="فروعنا"
            href="/branches"
            onClick={() => onOpenChange(false)}
          />

          <div>
            <MenuItem
              icon={<Download className="size-5" />}
              label="حمل التطبيق"
              href="#"
              onClick={(e: React.MouseEvent) => e.preventDefault()}
            />

            <div className="flex gap-3 justify-center mt-4">
              {/* Google Play Button */}
              <Link prefetch href="#" className="block">
                <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors min-w-[140px]">
                  <Image
                    src={"/icons/social/google-play.svg"}
                    alt="google play"
                    width={20}
                    height={20}
                  />
                  <div className="text-right">
                    <div className="text-xs text-gray-300">Get it on</div>
                    <div className="text-sm font-medium">Google Play</div>
                  </div>
                </div>
              </Link>

              {/* App Store Button */}
              <Link prefetch href="#" className="block">
                <div className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors min-w-[140px]">
                  <Image
                    src={"/icons/social/apple.svg"}
                    alt="apple"
                    width={20}
                    height={20}
                  />
                  <div className="text-right">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-sm font-medium">App Store</div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <MenuItem
            icon={<LanguagesIcon className="size-5" />}
            label="العربية"
            href="/language"
            onClick={() => onOpenChange(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
