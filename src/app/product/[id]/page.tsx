"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Minus, Plus, Share2, ShoppingCart, Star } from "lucide-react";

// Mock product data (would be fetched from API in a real app)
const product = {
  id: "1",
  name: "باراسيتامول 500 مجم",
  brandName: "باناديول",
  price: 15.99,
  oldPrice: 19.99,
  discount: 20,
  rating: 4.8,
  reviewCount: 120,
  description:
    "باراسيتامول 500 مجم هو دواء مسكن للألم ومخفض للحرارة، يستخدم لعلاج الصداع وآلام العضلات والمفاصل والحمى. يعتبر من الأدوية الآمنة والفعالة عند استخدامه وفقًا للجرعات الموصى بها.",
  features: [
    "يخفف الألم بسرعة",
    "آمن للاستخدام",
    "مناسب للبالغين والأطفال فوق 12 سنة",
    "يمكن تناوله مع أو بدون طعام",
  ],
  images: [
    "/products/product-1.jpg",
    "/products/product-2.jpg",
    "/products/product-3.jpg",
    "/products/product-4.jpg",
  ],
  relatedProducts: [
    {
      id: "2",
      name: "ايبوبروفين 400 مجم",
      price: 12.99,
      image: "/products/product-2.jpg",
    },
    {
      id: "3",
      name: "فيتامين سي 1000 مجم",
      price: 24.99,
      image: "/products/product-3.jpg",
    },
    {
      id: "4",
      name: "زنك + فيتامين د",
      price: 18.5,
      image: "/products/product-4.jpg",
    },
    {
      id: "5",
      name: "مسكن آلام العضلات",
      price: 22.75,
      image: "/products/product-5.jpg",
    },
  ],
};

export default function ProductPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4" dir="rtl">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-green-600">
          الرئيسية
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-green-600">
          المنتجات
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={product.images[selectedImage] || "/placeholder-product.jpg"}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-20 w-20 rounded-md overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-green-600"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image || "/placeholder-product.jpg"}
                  alt={`${product.name} - صورة ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              {product.name}
            </h1>
            <p className="text-gray-600">{product.brandName}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviewCount} تقييم)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-gray-900">
              {product.price} ريال
            </span>
            {product.oldPrice && (
              <span className="text-gray-500 line-through text-sm">
                {product.oldPrice} ريال
              </span>
            )}
            {product.discount && (
              <span className="bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded">
                خصم {product.discount}%
              </span>
            )}
          </div>

          <Separator />

          {/* Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 text-gray-900 font-medium">
                  {quantity}
                </span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
              <Button className="bg-green-600 hover:bg-green-700 text-white flex-1 h-11 text-base">
                <ShoppingCart className="ml-2" size={18} />
                إضافة إلى السلة
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 border-gray-300"
              >
                <Heart size={18} className="text-gray-600" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-11 w-11 border-gray-300"
              >
                <Share2 size={18} className="text-gray-600" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3 pt-4">
            <h3 className="font-semibold text-gray-900">المميزات:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-green-600"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-gray-900 mb-4">وصف المنتج</h2>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6">منتجات ذات صلة</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product.relatedProducts.map((relatedProduct) => (
            <Link
              href={`/product/${relatedProduct.id}`}
              key={relatedProduct.id}
            >
              <Card className="h-full hover:shadow-md transition-shadow">
                <div className="p-4 flex flex-col h-full">
                  <div className="relative h-40 mb-4 rounded-md overflow-hidden">
                    <Image
                      src={relatedProduct.image || "/placeholder-product.jpg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-green-600 font-bold mt-auto">
                    {relatedProduct.price} ريال
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
