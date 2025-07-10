"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCardGrid from "./ProductCardGrid";
import { usePopularCategories } from "@/lib/hooks/use-products";
import { Product } from "@/lib/api/products";

const CategoryProductList = ({ products }: { products: Product[] }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const slideCount = Math.ceil(products.length / 2);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={products[0]?.categoryId || "empty"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Mobile: Carousel */}
        <div className="lg:hidden">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              direction: "rtl",
              slidesToScroll: 2,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {products.map((product) => (
                <CarouselItem key={product.id} className="pl-2 basis-1/2">
                  {/* Smaller card on mobile */}
                  <ProductCardGrid product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {slideCount > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: slideCount }).map((_, index) => (
                <button
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all ${
                    current === index ? "bg-green-500 w-4" : "bg-gray-300"
                  }`}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
          {products.map((product) => (
            <ProductCardGrid key={product.id} product={product} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const CategorizedProductTabs = () => {
  const {
    data: popularCategoriesData,
    isLoading,
    isError,
  } = usePopularCategories();

  if (isLoading) {
    // Show a skeleton loader for the whole component
    return (
      <div className="w-full my-4">
        <div className="text-center mb-2 md:mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">
            الفئات الأكثر شهرة في المتجر
          </h2>
        </div>
        {/* Skeleton for tabs */}
        <div className="flex justify-center gap-2 md:gap-4">
          <div className="h-12 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-12 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-12 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
        {/* Skeleton for products */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardGrid key={index} product={{} as any} isLoading={true} />
        ))}
        </div>
      </div>
    );
  }

  if (isError || !popularCategoriesData?.categories?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">حدث خطأ أثناء تحميل الفئات</p>
      </div>
    );
  }

  const categories = popularCategoriesData.categories;

  return (
    <div className="w-full my-8">
      {/* Header */}
      <div className="text-center mb-2 md:mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 md:mb-4">
          الفئات الأكثر شهرة في المتجر
        </h2>
      </div>

      <Tabs dir="rtl" defaultValue={categories[0].id} className="w-full">
        <TabsList className="mx-auto bg-transparent max-w-lg w-full mb-2 md:mb-4 p-1 gap-4 h-auto">
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
          <TabsContent key={category.id} value={category.id}>
            {category.topProducts && category.topProducts.length > 0 ? (
              <CategoryProductList products={category.topProducts} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">لا توجد منتجات في هذه الفئة</p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CategorizedProductTabs;
