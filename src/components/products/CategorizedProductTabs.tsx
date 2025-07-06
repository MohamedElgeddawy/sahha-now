"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCardGrid from "./ProductCardGrid";
import { useProducts } from "@/lib/hooks/use-products";

// Categories data
const categories = [
  {
    id: "0197d009-f9fe-77f1-8e85-bad29b41ebc1",
    name: "Medicines & Treatments",
    arabicName: "الأدوية والعلاجات",
    description: "Medications, pain relief, and medical treatments.",
  },
  {
    id: "0197d009-fa02-7523-8fed-f2ace65943da",
    name: "Vitamins & Healthy Nutrition",
    arabicName: "الفيتامينات والتغذية الصحية",
    description: "Dietary supplements, vitamins, and nutritional products.",
  },

  {
    id: "0197d009-f9f1-72b1-9bea-e17496869de2",
    name: "Skincare",
    arabicName: "العناية بالبشرة",
    description: "Products for skin health, beauty, and dermatological care.",
  },
];

interface CategoryTabProps {
  categoryId: string;
}

const CategoryTab = ({ categoryId }: CategoryTabProps) => {
  const { data: productsData, isLoading } = useProducts({
    categoryIds: [categoryId],
    limit: 4,
    page: 1,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardGrid key={index} product={{}} isLoading={true} />
        ))}
      </div>
    );
  }

  if (!productsData?.products?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">لا توجد منتجات في هذه الفئة</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {productsData.products.map((product) => (
        <ProductCardGrid key={product.id} product={product} />
      ))}
    </div>
  );
};

const CategorizedProductTabs = () => {
  return (
    <div className="w-full my-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          الفئات الأكثر شهرة في المتجر
        </h2>
      </div>

      <Tabs dir="rtl" defaultValue={categories[0].id} className="w-full">
        <TabsList className="mx-auto bg-transparent max-w-lg w-full mb-8 p-1 gap-4 h-auto">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="text-xs md:text-sm px-2 py-3 data-[state=active]:!bg-[#2D9CDB] data-[state=active]:!text-white !text-[#2D9CDB] border border-[#2D9CDB] data-[state=active]:shadow-sm rounded-lg text-center whitespace-nowrap"
            >
              {category.arabicName}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <CategoryTab categoryId={category.id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CategorizedProductTabs;
