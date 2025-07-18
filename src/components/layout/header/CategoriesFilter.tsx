"use client";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@components/ui/drawer";
import { CategoryResponse } from "@api/products";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useIsClient, useMediaQuery } from "usehooks-ts";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setFilter } from "@redux/slices/filtersSlice";
import { useFilterParams } from "@hooks/use-filter-params";
import { useRouter } from "next/navigation";

const CategoriesFilter = ({
  categoriesResponse,
}: {
  categoriesResponse?: CategoryResponse;
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isClient = useIsClient();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { updateURL } = useFilterParams();
  const router = useRouter();
  const { activeFilters } = useAppSelector((state) => state.filters);

  const handleCategorySelect = (categoryId: string) => {
    // Update Redux store with selected category
    dispatch(setFilter({ categoryIds: [categoryId] }));

    // Update URL with category filter
    updateURL({ ...activeFilters, categoryIds: [categoryId] });

    // Navigate to products page
    router.push(`/products?categoryIds=${categoryId}`, { scroll: false });

    setIsOpen(false);
  };

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
    <button
      key={category.id}
      onClick={() => handleCategorySelect(category.id)}
      className="w-full text-right py-3 px-4 hover:bg-gray-50 text-[#2C3E50] text-[16px] border-b border-gray-100 last:border-b-0 block"
    >
      {category.arabicName}
    </button>
  ));

  if (isMobile && isClient) {
    return (
      <Drawer direction="bottom" open={isOpen} onOpenChange={setIsOpen}>
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
    <DropdownMenu dir="rtl" open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {categoriesResponse?.categories?.map((category) => (
          <DropdownMenuItem
            key={category.id}
            onClick={() => handleCategorySelect(category.id)}
            className="w-full text-right py-2 px-4 hover:bg-gray-50 text-[#2C3E50] text-[16px] cursor-pointer"
          >
            {category.arabicName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CategoriesFilter;
