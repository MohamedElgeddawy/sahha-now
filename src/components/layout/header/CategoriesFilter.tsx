import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CategoryResponse } from "@/lib/api/products";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useIsClient, useMediaQuery } from "usehooks-ts";

const CategoriesFilter = ({
  categoriesResponse,
}: {
  categoriesResponse?: CategoryResponse;
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isClient = useIsClient();

  const triggerButton = (
    <Button
      variant="ghost"
      className="h-[48px] px-4 border border-[#DADADA] border-l-0 rounded-r-[8px] rounded-l-none flex items-center gap-2 hover:bg-gray-50 text-[16px] text-[#2C3E50] font-medium"
    >
      <span>الفئات</span>
      <ChevronDown className="w-5 h-5" />
    </Button>
  );

  const categoryItems = categoriesResponse?.categories?.map((category) => (
    <Link
      key={category.id}
      prefetch
      href={`/products?categoryIds=${category.id}`}
      className="w-full text-right py-3 px-4 hover:bg-gray-50 text-[#2C3E50] text-[16px] border-b border-gray-100 last:border-b-0 block"
    >
      {category.arabicName}
    </Link>
  ));

  if (isMobile && isClient) {
    return (
      <Drawer direction="bottom">
        <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
        <DrawerContent className="max-h-[60vh] bg-white">
          <DrawerHeader>
            <DrawerTitle className="text-center text-[#2C3E50] text-[18px] font-medium">
              الفئات
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4 overflow-y-auto" dir="rtl">
            {categoryItems}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
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
  );
};

export default CategoriesFilter;
