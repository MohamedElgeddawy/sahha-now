export interface Product {
  id: string;
  title: string;
  arabicTitle: string;
  category: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
}

export const featuredProducts: Product[] = [
  {
    id: "1",
    title: "Jamieson Multivitamins",
    arabicTitle: "جاميسون فيتامينات ومعادن متعددة",
    category: "الفيتامينات والتغذية الصحية",
    image: "/images/products/jamieson-multivitamins.png",
    price: 125.0,
    originalPrice: 160.0,
    discount: 45,
    rating: 3,
    reviewCount: 341,
  },
  {
    id: "2",
    title: "Baby Joy Diapers Size 5",
    arabicTitle: "بيبي جوي مقاس (5) صندوق ميجا",
    category: "حفاضات عادية",
    image: "/images/products/baby-joy-diapers.png",
    price: 201.51,
    originalPrice: 230.0,
    discount: 10,
    rating: 5,
    reviewCount: 341,
  },
  {
    id: "3",
    title: "Rimmel Lip Latex",
    arabicTitle: "ريميل ليبستيكر للاكس أحمر للشفاه",
    category: "أحمر شفاه سائل",
    image: "/images/products/rimmel-lip-latex.png",
    price: 46.15,
    originalPrice: 71.0,
    discount: 35,
    rating: 5,
    reviewCount: 341,
  },
  {
    id: "4",
    title: "Lux Magical Orchid Body Wash",
    arabicTitle: "لوكس سائل استحمام سحر الأوركيد",
    category: "جل استحمام فاخر",
    image: "/images/products/lux-body-wash.png",
    price: 30.51,
    originalPrice: 36.54,
    discount: 15,
    rating: 5,
    reviewCount: 63,
  },
  {
    id: "5",
    title: "Nivea Soft Moisturizing Cream",
    arabicTitle: "نيفيا كريم مرطب ناعم للوجه والجسم",
    category: "كريمات العناية بالبشرة",
    image: "/images/products/nivea-soft-cream.png",
    price: 18.99,
    originalPrice: 24.99,
    discount: 20,
    rating: 4,
    reviewCount: 218,
  },
  {
    id: "6",
    title: "Pantene Pro-V Shampoo",
    arabicTitle: "بانتين برو-في شامبو للشعر",
    category: "العناية بالشعر",
    image: "/images/products/pantene-shampoo.png",
    price: 22.5,
    originalPrice: 27.99,
    discount: 15,
    rating: 4,
    reviewCount: 189,
  },
];
