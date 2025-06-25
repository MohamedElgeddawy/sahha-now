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

export interface ProductReview {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

export interface ProductsResponse {
  products: Product[];
  page: number;
  limit: number;
  totalPages: number;
}

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
): Promise<ProductsResponse> {
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

export async function fetchProductReviews(
  productId: string
): Promise<ProductReview[]> {
  try {
    const response = await sahhaInstance.get(`/products/${productId}/reviews`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    return [];
  }
}

export async function fetchFavoriteProducts(
  filters: ProductFilters = {}
): Promise<Product[]> {
  try {
    const response = await sahhaInstance.get("/favourites", {
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
): Promise<ProductsResponse> {
  try {
    const response = await sahhaInstance.get("/products/offers", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching offer products:", error);
    return {
      products: [],
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  }
}

// Add review to a product
export const addProductReview = async (
  productId: string,
  reviewData: {
    rating: number;
    comment?: string;
  }
) => {
  try {
    // Get token from localStorage for client-side requests
    let token;

    if (typeof window !== "undefined") {
      // Try localStorage first
      token = localStorage.getItem("accessToken");
    }

    if (!token) {
      console.error("No authentication token found");
      throw new Error("Authentication required");
    }

    console.log("Sending review with token present, product ID:", productId);

    // Use sahhaInstance directly instead of fetch
    const response = await sahhaInstance.post(
      `/products/${productId}/reviews`,
      {
        rating: reviewData.rating,
        comment: reviewData.comment || "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Review submission successful:", response.status);
    return response.data;
  } catch (error: any) {
    console.error("Error adding product review:", error);

    // Check if it's an authentication error
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error("Authentication required");
    }

    throw error;
  }
};
