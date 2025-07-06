import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductFilters, FiltersMetadata } from "@/lib/api/products";

interface FiltersState {
  activeFilters: ProductFilters;
  metadata: FiltersMetadata | null;
  isMetadataLoading: boolean;
}

const initialState: FiltersState = {
  activeFilters: {
    page: 1,
    limit: 12,
    categoryIds: [],
    brandIds: [],
  },
  metadata: null,
  isMetadataLoading: false,
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
    },
    setMetadata: (state, action: PayloadAction<FiltersMetadata>) => {
      state.metadata = action.payload;
      state.isMetadataLoading = false;
    },
    setMetadataLoading: (state, action: PayloadAction<boolean>) => {
      state.isMetadataLoading = action.payload;
    },
  },
});

export const {
  setFilter,
  setFilters,
  resetFilters,
  setMetadata,
  setMetadataLoading,
} = filtersSlice.actions;

export default filtersSlice.reducer;
