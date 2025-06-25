import sahhaInstance from "./sahhaInstance";

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
  createdAt: string;
  updatedAt: string;
  rating: string;
  comment: string;
  productId: string;
  customerId: string;
  customer: {
    fullname: string;
  };
}

export interface ReviewResponse {
  reviews: ProductReview[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export async function fetchProductStats(
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
  productId: string,
  page: number,
  limit: number
): Promise<ReviewResponse> {
  try {
    const response = await sahhaInstance.get(`/products/${productId}/reviews`, {
      params: {
        page,
        limit,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    return {
      reviews: [],
      page: 0,
      limit: 0,
      total: 0,
      totalPages: 0,
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
    const response = await sahhaInstance.post(
      `/products/${productId}/reviews`,
      {
        rating: reviewData.rating,
        comment: reviewData.comment || "",
      }
    );

    return response.data;
  } catch (error: any) {
    // Check if it's an authentication error
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error("Authentication required");
    }

    throw error;
  }
};
