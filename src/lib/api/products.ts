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
  media: any[];
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
  category: string | null;
  _count: {
    reviews: number;
    favourites: number;
  };
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
