import Image from "next/image";
import Link from "next/link";
import { RatingStars } from "@/components/ui/RatingStars";

export function RelatedProducts() {
  // Temporary data - replace with actual related products
  const relatedProducts = [
    {
      id: 1,
      name: "منتج مشابه 1",
      price: 149.99,
      rating: 4.5,
      image: "/images/product-1.jpg",
    },
    {
      id: 2,
      name: "منتج مشابه 2",
      price: 199.99,
      rating: 4.0,
      image: "/images/product-2.jpg",
    },
    {
      id: 3,
      name: "منتج مشابه 3",
      price: 179.99,
      rating: 4.8,
      image: "/images/product-3.jpg",
    },
    {
      id: 4,
      name: "منتج مشابه 4",
      price: 129.99,
      rating: 4.2,
      image: "/images/product-4.jpg",
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-[#2C3E50]">منتجات مشابهة</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group"
          >
            <div className="space-y-4">
              <div className="aspect-square relative rounded-lg overflow-hidden bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                  {product.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">
                    {product.price} ج.م
                  </span>
                  <RatingStars rating={product.rating} size="sm" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
