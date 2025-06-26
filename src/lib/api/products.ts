import sahhaInstance from "./sahhaInstance";

export interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  arabicName: string;
  sku: string | null;
  shortDescription: string;
  longDescription: string;
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
    arabicName: string;
    isBestBrand: boolean;
    logoUrl: string | null;
    logoKey: string | null;
    logoFileName: string | null;
  };
  category: Category;
  variants: ProductVariant[];
  _count: {
    reviews: number;
    favourites: number;
  };
}

export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  arabicName: string;
  shortDescription: string;
  logoKey: string | null;
  logo: string | null;
}

export interface ProductVariant {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  arabicName: string;
  sku: string;
  price: string;
  discount: string;
  isAvailable: boolean;
  isDefault: boolean;
  productId: string;
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
  categoryIds?: string[];
  brandIds?: string[];
  search?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  hasDiscount?: boolean;
}

export interface FavoriteProductsResponse {
  favourites: Product[];
  page: number;
  limit: number;
  totalPages: number;
}

export interface FiltersMetadata {
  categories: {
    id: string;
    name: string;
    arabicName: string;
    productCount: number;
  }[];
  brands: {
    id: string;
    name: string;
    arabicName: string;
    productCount: number;
  }[];
  ratings: {
    rating: number;
    count: number;
  }[];
}

export interface CategoryResponse {
  categories: Category[];
  total: number;
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

export async function fetchFavoriteProducts(
  filters: ProductFilters = {}
): Promise<FavoriteProductsResponse> {
  try {
    const response = await sahhaInstance.get("/favourites", {
      params: filters,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    return {
      favourites: [],
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  }
}
export async function fetchFavoriteProductsCount(): Promise<number> {
  try {
    const response = await sahhaInstance.get("/favourites/count");
    return response.data.count;
  } catch (error) {
    console.error("Error fetching favorite products:", error);
    return 0;
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

export async function fetchCategories(): Promise<CategoryResponse> {
  try {
    const response = await sahhaInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {
      categories: [],
      total: 0,
    };
  }
}

export const fetchFiltersMetadata = async (): Promise<FiltersMetadata> => {
  try {
    const res = await sahhaInstance.get<FiltersMetadata>(
      "/products/filters-metadata"
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return {
      categories: [],
      brands: [],
      ratings: [],
    };
  }
};
