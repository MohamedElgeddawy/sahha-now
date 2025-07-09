import sahhaInstance from "./sahhaInstance";
import { truthyParams } from "../utils";

export interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  arabicName: string;
  sku: string | null;
  shortDescription: string;
  arabicShortDescription: string;
  longDescription: string;
  arabicLongDescription: string;
  price: string;
  discount: string;
  averageRating: string;
  isFavourite: boolean;
  giftPoints: number | null;
  brandId: string;
  categoryId: string;
  media: {
    id: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
    filename: string;
    isMain: boolean;
    key: string;
    url: string;
    isFileConfirmed: boolean;
    thumbnailKey: string;
    thumbnailUrl: string;
    isThumbnailConfirmed: boolean;
  }[];
  brand: {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    arabicName: string;
    isBestBrand: boolean;
    logoUrl: string;
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
  arabicShortDescription: string;
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
  discount?: string;
  isAvailable: boolean;
  isDefault: boolean;
  productId: string;
  colour?: string;
  size?: string | null;
}

export interface SingleProductResponse {
  product: Product;
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
  searchQuery?: string;
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
    logoUrl: string;
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

export interface Brand {
  id: string;
  name: string;
  arabicName: string;
  productCount?: number;
  logoUrl: string;
  isBestBrand?: boolean;
  createdAt?: string;
  updatedAt?: string;
  logoKey?: string | null;
  logoFileName?: string | null;
}

export interface BrandsResponse {
  brands: Brand[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface PopularCategory {
  id: string;
  name: string;
  arabicName: string;
  topProducts: Product[];
}

export interface PopularCategoriesResponse {
  categories: PopularCategory[];
}

export async function fetchPopularCategories(): Promise<PopularCategoriesResponse> {
  try {
    const response = await sahhaInstance.get("/categories/popular");
    return response.data;
  } catch (error) {
    console.error("Error fetching popular categories:", error);
    return {
      categories: [],
    };
  }
}
export async function fetchProducts(
  filters: ProductFilters = {
    page: 1,
    limit: 12,
    categoryIds: [],
    brandIds: [],
  }
): Promise<ProductsResponse> {
  try {
    const response = await sahhaInstance.get("/products", {
      params: truthyParams(filters),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      page: 1,
      limit: 10,
      totalPages: 1,
    };
  }
}

export async function fetchProduct(id: string): Promise<Product> {
  try {
    const response = await sahhaInstance.get<Product>(`/products/${id}`);
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error(`Failed to fetch product with id ${id}`);
  }
}

export async function fetchFavoriteProducts(
  filters: ProductFilters = {
    page: 1,
    limit: 12,
    categoryIds: [],
    brandIds: [],
  }
): Promise<FavoriteProductsResponse> {
  try {
    const response = await sahhaInstance.get("/favourites", {
      params: truthyParams(filters),
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
  filters: ProductFilters = {
    page: 1,
    limit: 12,
    categoryIds: [],
    brandIds: [],
  }
): Promise<ProductsResponse> {
  try {
    const response = await sahhaInstance.get("/products/offers", {
      params: truthyParams(filters),
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

export async function fetchBrands(
  params: { page?: number; limit?: number } = {}
): Promise<BrandsResponse> {
  try {
    const response = await sahhaInstance.get<BrandsResponse>("/brands", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return {
      brands: [],
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 1,
    };
  }
}
