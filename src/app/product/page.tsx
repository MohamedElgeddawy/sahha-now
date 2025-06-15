"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Heart, Search, ShoppingCart, Sliders } from "lucide-react";

// Mock products data (would be fetched from API in a real app)
const products = [
  {
    id: "1",
    name: "باراسيتامول 500 مجم",
    brandName: "باناديول",
    price: 15.99,
    oldPrice: 19.99,
    discount: 20,
    rating: 4.8,
    reviewCount: 120,
    category: "مسكنات",
    image: "/products/product-1.jpg",
  },
  {
    id: "2",
    name: "ايبوبروفين 400 مجم",
    brandName: "أدفيل",
    price: 12.99,
    category: "مسكنات",
    rating: 4.5,
    reviewCount: 85,
    image: "/products/product-2.jpg",
  },
  {
    id: "3",
    name: "فيتامين سي 1000 مجم",
    brandName: "نيوترا",
    price: 24.99,
    category: "فيتامينات",
    rating: 4.7,
    reviewCount: 210,
    image: "/products/product-3.jpg",
  },
  {
    id: "4",
    name: "زنك + فيتامين د",
    brandName: "نيوترا",
    price: 18.5,
    category: "فيتامينات",
    rating: 4.6,
    reviewCount: 150,
    image: "/products/product-4.jpg",
  },
  {
    id: "5",
    name: "مسكن آلام العضلات",
    brandName: "فولتارين",
    price: 22.75,
    oldPrice: 27.99,
    discount: 15,
    category: "مسكنات",
    rating: 4.4,
    reviewCount: 95,
    image: "/products/product-5.jpg",
  },
  {
    id: "6",
    name: "مكمل غذائي للشعر والأظافر",
    brandName: "بيوتين",
    price: 35.99,
    category: "مكملات غذائية",
    rating: 4.9,
    reviewCount: 320,
    image: "/products/product-6.jpg",
  },
  {
    id: "7",
    name: "شراب للسعال",
    brandName: "ديكسترومثورفان",
    price: 19.5,
    category: "أدوية السعال",
    rating: 4.3,
    reviewCount: 78,
    image: "/products/product-7.jpg",
  },
  {
    id: "8",
    name: "بخاخ للأنف",
    brandName: "أوتريفين",
    price: 16.25,
    category: "أدوية الزكام",
    rating: 4.2,
    reviewCount: 64,
    image: "/products/product-8.jpg",
  },
];

// Categories for filtering
const categories = [
  "الكل",
  "مسكنات",
  "فيتامينات",
  "مكملات غذائية",
  "أدوية السعال",
  "أدوية الزكام",
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [showFilters, setShowFilters] = useState(false);

  // Filter products based on search query and selected category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brandName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "الكل" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto py-8 px-4" dir="rtl">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-600">
          الرئيسية
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">المنتجات</span>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">المنتجات</h1>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              placeholder="ابحث عن منتج..."
              className="pr-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="md:w-auto w-full h-12 border-gray-300 gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Sliders size={18} />
            تصفية
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">التصنيفات</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  className={`rounded-full ${
                    selectedCategory === category
                      ? "bg-green-600 hover:bg-green-700"
                      : "border-gray-300"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 bg-gray-100">
                <div className="absolute top-3 left-3 z-10 flex gap-1">
                  {product.discount && (
                    <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                      خصم {product.discount}%
                    </span>
                  )}
                </div>
                <div className="absolute top-3 right-3 z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-white hover:bg-white/90 text-gray-600"
                  >
                    <Heart size={18} />
                  </Button>
                </div>
                <Link href={`/product/${product.id}`}>
                  <div className="relative h-48 w-full">
                    <Image
                      src={product.image || "/placeholder-product.jpg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                </Link>
              </div>
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h2 className="font-medium text-gray-900 mb-1 line-clamp-2 hover:text-green-600">
                    {product.name}
                  </h2>
                </Link>
                <p className="text-sm text-gray-500 mb-3">
                  {product.brandName}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">
                      {product.price} ريال
                    </span>
                    {product.oldPrice && (
                      <span className="text-gray-500 line-through text-sm">
                        {product.oldPrice} ريال
                      </span>
                    )}
                  </div>
                  <Button
                    size="icon"
                    className="rounded-full bg-green-600 hover:bg-green-700 h-9 w-9"
                  >
                    <ShoppingCart size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            لم يتم العثور على منتجات
          </h3>
          <p className="text-gray-500">
            جرب البحث بكلمات مختلفة أو تصفح جميع المنتجات
          </p>
          <Button
            className="mt-4 bg-green-600 hover:bg-green-700"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("الكل");
            }}
          >
            عرض جميع المنتجات
          </Button>
        </div>
      )}
    </div>
  );
}
