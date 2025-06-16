export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  images: string[];
  category: string;
  categoryId: string;
  categorySlug: string;
  specifications: {
    label: string;
    value: string;
  }[];
  reviews: {
    id: number;
    userName: string;
    rating: number;
    date: string;
    comment: string;
  }[];
  stock: number;
  colors?: {
    name: string;
    value: string;
  }[];
  sizes?: string[];
}

export async function fetchProduct(id: string): Promise<Product> {
  // Temporary mock data - replace with actual API call
  return {
    id,
    name: "اسم المنتج",
    description: "وصف المنتج",
    price: 199.99,
    oldPrice: 249.99,
    images: [
      "/images/product-1.jpg",
      "/images/product-2.jpg",
      "/images/product-3.jpg",
      "/images/product-4.jpg",
    ],
    category: "الفئة",
    categoryId: "1",
    categorySlug: "category-1",
    specifications: [
      { label: "الماركة", value: "Brand Name" },
      { label: "الموديل", value: "Model XYZ" },
    ],
    reviews: [
      {
        id: 1,
        userName: "أحمد محمد",
        rating: 5,
        date: "2024-03-15",
        comment: "منتج رائع وجودة ممتازة",
      },
    ],
    stock: 50,
    colors: [
      { name: "أحمر", value: "#FF0000" },
      { name: "أزرق", value: "#0000FF" },
    ],
    sizes: ["S", "M", "L", "XL"],
  };
} 