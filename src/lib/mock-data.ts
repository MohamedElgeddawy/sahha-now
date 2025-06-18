export interface Product {
  id: string;
  title: string;
  arabicTitle: string;
  category: string;
  images: string[];
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  description: string;
  stock: number;
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
}

export const featuredProducts: Product[] = [
  {
    id: "garnier-micellar",
    title: "Garnier Micellar Cleansing Water",
    arabicTitle: "جارنييه سكين اكتيف ماء ميسيلار",
    category: "العناية بالبشرة",
    images: [
      "/images/product-1.jpg",
      "/images/product-2.jpg",
      "/images/product-1.jpg",
    ],
    price: 24.12,
    originalPrice: 34.45,
    discount: 15,
    rating: 4.2,
    reviewCount: 341,
    description:
      "لأول مرة نقدم لك غارنييه ماء ميسيلار، تكنولوجيا متخصصة في إزالة المكياج ومنظفة من جزيئات الميسيلار التي تعمل على إزالة الأوساخ والمكياج بكل سهولة",
    stock: 18,
    specifications: [
      { label: "الحجم", value: "400 مل" },
      { label: "نوع البشرة", value: "جميع أنواع البشرة" },
      { label: "المميزات", value: "يزيل المكياج، ينظف، يهدئ" },
      { label: "بلد المنشأ", value: "فرنسا" },
      { label: "تاريخ الصلاحية", value: "24 شهر من تاريخ الإنتاج" },
    ],
    reviews: [
      {
        id: 1,
        userName: "مريم علي",
        rating: 5,
        date: "2024-03-12",
        comment:
          "من افضل منتجات التنظيف اللي جربتها، بينظف البشرة كويس و ما بيسبب اي تهيج للبشرة. المنتج ممتاز للبشرة الحساسة.",
      },
      {
        id: 2,
        userName: "نورا",
        rating: 4,
        date: "2024-03-10",
        comment:
          "منتج جيد جداً يزيل المكياج بسهولة. لكن السعر شوية غالي بالنسبة للحجم.",
      },
      {
        id: 3,
        userName: "سارة",
        rating: 5,
        date: "2024-03-11",
        comment:
          "استخدمته اكثر من مرة وكل المكياج راح بسهولة حتى المكياج الثابت. منتج اصلي وسعر والتغليف.",
      },
    ],
  },
  {
    id: "1",
    title: "Jamieson Multivitamins",
    arabicTitle: "جاميسون فيتامينات ومعادن متعددة",
    category: "الفيتامينات والتغذية الصحية",
    images: [
      "/images/products/jamieson-multivitamins.png",
      "/images/products/jamieson-multivitamins.png",
      "/images/products/jamieson-multivitamins.png",
    ],
    price: 125.0,
    originalPrice: 160.0,
    discount: 45,
    rating: 3,
    reviewCount: 341,
    description: "فيتامينات ومعادن متعددة للبالغين",
    stock: 50,
    specifications: [
      { label: "العدد", value: "60 قرص" },
      { label: "الاستخدام", value: "قرص يومياً" },
    ],
    reviews: [
      {
        id: 1,
        userName: "أحمد محمد",
        rating: 4,
        date: "2024-03-15",
        comment: "منتج جيد جداً، لاحظت تحسن في نشاطي اليومي.",
      },
      {
        id: 2,
        userName: "فاطمة",
        rating: 3,
        date: "2024-03-14",
        comment: "مقبول، لكن سعره مرتفع مقارنة بالمنتجات المشابهة.",
      },
    ],
  },
  {
    id: "2",
    title: "Baby Joy Diapers Size 5",
    arabicTitle: "بيبي جوي مقاس (5) صندوق ميجا",
    category: "حفاضات عادية",
    images: [
      "/images/products/baby-joy-diapers.png",
      "/images/products/baby-joy-diapers.png",
      "/images/products/baby-joy-diapers.png",
    ],
    price: 201.51,
    originalPrice: 230.0,
    discount: 10,
    rating: 5,
    reviewCount: 341,
    description: "حفاضات بيبي جوي مقاس 5 للأطفال",
    stock: 100,
    specifications: [
      { label: "المقاس", value: "5" },
      { label: "العدد", value: "76 حفاض" },
    ],
    reviews: [
      {
        id: 1,
        userName: "هدى",
        rating: 5,
        date: "2024-03-13",
        comment: "جودة ممتازة وسعر معقول، أفضل من الماركات الأخرى.",
      },
    ],
  },
  {
    id: "3",
    title: "Rimmel Lip Latex",
    arabicTitle: "ريميل ليبستيكر للاكس أحمر للشفاه",
    category: "أحمر شفاه سائل",
    images: [
      "/images/products/rimmel-lip-latex.png",
      "/images/products/rimmel-lip-latex.png",
      "/images/products/rimmel-lip-latex.png",
    ],
    price: 46.15,
    originalPrice: 71.0,
    discount: 35,
    rating: 5,
    reviewCount: 341,
    description: "أحمر شفاه سائل بتركيبة مميزة",
    stock: 30,
    specifications: [
      { label: "اللون", value: "أحمر" },
      { label: "النوع", value: "سائل" },
    ],
    reviews: [],
  },
  {
    id: "4",
    title: "Lux Magical Orchid Body Wash",
    arabicTitle: "لوكس سائل استحمام سحر الأوركيد",
    category: "جل استحمام فاخر",
    images: [
      "/images/products/lux-body-wash.png",
      "/images/products/lux-body-wash.png",
      "/images/products/lux-body-wash.png",
    ],
    price: 30.51,
    originalPrice: 36.54,
    discount: 15,
    rating: 5,
    reviewCount: 63,
    description: "سائل استحمام برائحة الأوركيد",
    stock: 45,
    specifications: [
      { label: "الحجم", value: "500 مل" },
      { label: "الرائحة", value: "أوركيد" },
    ],
    reviews: [],
  },
  {
    id: "5",
    title: "Nivea Soft Moisturizing Cream",
    arabicTitle: "نيفيا كريم مرطب ناعم للوجه والجسم",
    category: "كريمات العناية بالبشرة",
    images: [
      "/images/products/nivea-soft-cream.png",
      "/images/products/nivea-soft-cream.png",
      "/images/products/nivea-soft-cream.png",
    ],
    price: 18.99,
    originalPrice: 24.99,
    discount: 20,
    rating: 4,
    reviewCount: 218,
    description: "كريم مرطب للوجه والجسم",
    stock: 60,
    specifications: [
      { label: "الحجم", value: "200 مل" },
      { label: "النوع", value: "كريم مرطب" },
    ],
    reviews: [],
  },
  {
    id: "6",
    title: "Pantene Pro-V Shampoo",
    arabicTitle: "بانتين برو-في شامبو للشعر",
    category: "العناية بالشعر",
    images: [
      "/images/products/pantene-shampoo.png",
      "/images/products/pantene-shampoo.png",
      "/images/products/pantene-shampoo.png",
    ],
    price: 22.5,
    originalPrice: 27.99,
    discount: 15,
    rating: 4,
    reviewCount: 189,
    description: "شامبو للعناية بالشعر",
    stock: 75,
    specifications: [
      { label: "الحجم", value: "400 مل" },
      { label: "النوع", value: "شامبو" },
    ],
    reviews: [],
  },
];
