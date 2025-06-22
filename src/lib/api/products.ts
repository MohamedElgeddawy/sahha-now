import sahhaInstance from "./sahhaInstance";

export interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  sku: string | null;
  description: string;
  price: string;
  discount: string;
  averageRating: string;
  isFavourite: boolean;
  brandId: string;
  categoryId: string;
  media: {
    url: string;
    thumbnailUrl: string;
    isMain: boolean;
  }[];
  brand: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    isBestBrand: boolean;
    logoUrl: string | null;
    logoKey: string | null;
    logoFileName: string | null;
  };
  category: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    description: string;
  };
  variants: ProductVariant[];
  _count: {
    reviews: number;
    favourites: number;
  };
}

export interface ProductVariant {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  sku: string;
  price: string;
  discount: string;
  isAvailable: boolean;
  isDefault: boolean;
  productId: string;
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: [
    {
      rating: 5;
      count: number;
    },
    {
      rating: 4;
      count: number;
    },
    {
      rating: 3;
      count: number;
    },
    {
      rating: 2;
      count: number;
    },
    {
      rating: 1;
      count: number;
    }
  ];
}

// export interface ProductsResponse {
//   products: Product[];
//   totalCount: number;
//   currentPage: number;
//   totalPages: number;
// }

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  hasDiscount?: boolean;
}

export async function fetchProducts(
  filters: ProductFilters = {}
): Promise<Product[]> {
  try {
    const response = await sahhaInstance.get("/products", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function fetchProduct(id: string) {
  try {
    const response = await sahhaInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
  }
}

export async function fetchProductReviewStats(
  productId: string
): Promise<ReviewStats> {
  try {
    const response = await sahhaInstance.get(
      `/products/${productId}/reviews/stats`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error fetching review stats for product ${productId}:`,
      error
    );
    throw error;
  }
}

export async function fetchFavoriteProducts(
  filters: ProductFilters = {}
): Promise<Product[]> {
  try {
    const response = await sahhaInstance.get("/products/favourites", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    return [];
  }
}

export async function fetchOfferProducts(
  filters: ProductFilters = {}
): Promise<Product[]> {
  try {
    const response = await sahhaInstance.get("/products/offers", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching offer products:", error);
    return [];
  }
}
