import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductFilters, FiltersMetadata } from "@/lib/api/products";

interface FiltersState {
  activeFilters: ProductFilters;
  metadata: FiltersMetadata | null;
  isMetadataLoading: boolean;
  selectedCategories: string[];
  selectedBrands: string[];
}

const initialState: FiltersState = {
  activeFilters: {
    page: 1,
    limit: 12,
  },
  metadata: null,
  isMetadataLoading: false,
  selectedCategories: [],
  selectedBrands: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<ProductFilters>>) => {
      const newFilters = { ...state.activeFilters };

      // Process each property in the payload
      Object.entries(action.payload).forEach(([key, value]) => {
        if (value === undefined || value === false) {
          // Remove properties with undefined or false values
          delete newFilters[key as keyof ProductFilters];
        } else {
          // Set other properties normally
          newFilters[key as keyof ProductFilters] = value as any;
        }
      });

      // Update state with processed filters
      state.activeFilters = newFilters;

      // Reset page to 1 when filters change (except for page itself)
      if (!action.payload.hasOwnProperty("page")) {
        state.activeFilters.page = 1;
      }
    },
    setFilters: (state, action: PayloadAction<ProductFilters>) => {
      state.activeFilters = action.payload;
    },
    resetFilters: (state) => {
      state.activeFilters = initialState.activeFilters;
      state.selectedCategories = [];
      state.selectedBrands = [];
    },
    setMetadata: (state, action: PayloadAction<FiltersMetadata>) => {
      state.metadata = action.payload;
      state.isMetadataLoading = false;
    },
    setMetadataLoading: (state, action: PayloadAction<boolean>) => {
      state.isMetadataLoading = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<string>) => {
      const categoryId = action.payload;
      const index = state.selectedCategories.indexOf(categoryId);
      if (index > -1) {
        state.selectedCategories.splice(index, 1);
      } else {
        state.selectedCategories.push(categoryId);
      }
      // Update the category filter in activeFilters
      if (state.selectedCategories.length > 0) {
        state.activeFilters.categoryIds = state.selectedCategories;
      } else {
        delete state.activeFilters.categoryIds;
      }
      state.activeFilters.page = 1;
    },
    toggleBrand: (state, action: PayloadAction<string>) => {
      const brandId = action.payload;
      const index = state.selectedBrands.indexOf(brandId);
      if (index > -1) {
        state.selectedBrands.splice(index, 1);
      } else {
        state.selectedBrands.push(brandId);
      }
      // Update the brand filter in activeFilters
      if (state.selectedBrands.length > 0) {
        state.activeFilters.brandIds = state.selectedBrands;
      } else {
        delete state.activeFilters.brandIds;
      }
      state.activeFilters.page = 1;
    },
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload;
      if (action.payload.length > 0) {
        state.activeFilters.categoryIds = action.payload;
      } else {
        delete state.activeFilters.categoryIds;
      }
      state.activeFilters.page = 1;
    },
    setSelectedBrands: (state, action: PayloadAction<string[]>) => {
      state.selectedBrands = action.payload;
      if (action.payload.length > 0) {
        state.activeFilters.brandIds = action.payload;
      } else {
        delete state.activeFilters.brandIds;
      }
      state.activeFilters.page = 1;
    },
  },
});

export const {
  setFilter,
  setFilters,
  resetFilters,
  setMetadata,
  setMetadataLoading,
  toggleCategory,
  toggleBrand,
  setSelectedCategories,
  setSelectedBrands,
} = filtersSlice.actions;

export default filtersSlice.reducer;
