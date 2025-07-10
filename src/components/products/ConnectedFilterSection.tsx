import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setFilter } from "@redux/slices/filtersSlice";
import FilterSection from "./FilterSection";
import RatingFilterSection from "./RatingFilterSection";
import { Input } from "@components/ui/input";
import { useFilterParams } from "@hooks/use-filter-params";
import { Checkbox } from "@components/ui/checkbox";

export function CategoryFilterSection() {
  const dispatch = useAppDispatch();
  const { updateURL } = useFilterParams();
  const { metadata, activeFilters } = useAppSelector((state) => state.filters);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleCategoryToggle = (categoryId: string) => {
    // Update URL with new category selection
    const newCategories = activeFilters.categoryIds?.includes(categoryId)
      ? activeFilters.categoryIds?.filter((id) => id !== categoryId)
      : [...(activeFilters.categoryIds || []), categoryId];

    dispatch(setFilter({ categoryIds: newCategories }));
    updateURL({ ...activeFilters, categoryIds: newCategories });
  };

  const items = useMemo(
    () =>
      metadata?.categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        arabicName: cat.arabicName,
        count: cat.productCount,
      })) || [],
    [metadata]
  );

  return (
    <FilterSection
      title="تسوق بالفئات"
      items={items.map((item) => ({
        name: item.arabicName || item.name,
        count: item.count,
      }))}
      isCollapsed={isCollapsed}
      onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      onItemSelect={(itemName) => {
        const item = items.find((i) => (i.arabicName || i.name) === itemName);
        if (item) {
          handleCategoryToggle(item.id);
        }
      }}
      selectedItem={undefined}
      renderItem={(item) => {
        const fullItem = items.find(
          (i) => (i.arabicName || i.name) === item.name
        );
        const isSelected = fullItem
          ? activeFilters.categoryIds?.includes(fullItem.id)
          : false;

        return (
          <>
            <div className="flex items-center gap-2">
              <Checkbox
                id={`category-${fullItem?.id}`}
                checked={isSelected}
                onCheckedChange={() =>
                  fullItem && handleCategoryToggle(fullItem.id)
                }
                className="rounded border-gray-300"
              />
              <label
                htmlFor={`category-${fullItem?.id}`}
                className="text-gray-700 cursor-pointer"
              >
                {item.name}
              </label>
            </div>
            <span className="text-gray-500 text-sm">({item.count})</span>
          </>
        );
      }}
    />
  );
}

export function BrandFilterSection() {
  const dispatch = useAppDispatch();
  const { updateURL } = useFilterParams();
  const { metadata, activeFilters } = useAppSelector((state) => state.filters);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleBrandToggle = (brandId: string) => {
    // Update URL with new brand selection
    const newBrands = activeFilters.brandIds?.includes(brandId)
      ? activeFilters.brandIds?.filter((id) => id !== brandId)
      : [...(activeFilters.brandIds || []), brandId];

    dispatch(setFilter({ brandIds: newBrands }));
    updateURL({ ...activeFilters, brandIds: newBrands });
  };

  const items = useMemo(
    () =>
      metadata?.brands.map((brand) => ({
        id: brand.id,
        name: brand.name,
        arabicName: brand.arabicName,
        count: brand.productCount,
      })) || [],
    [metadata]
  );

  // Filter brands based on search term
  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        (item.arabicName || item.name)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ),
    [items, searchTerm]
  );

  return (
    <FilterSection
      title="تسوق بالعلامة التجارية"
      items={filteredItems.map((item) => ({
        name: item.arabicName || item.name,
        count: item.count,
      }))}
      isCollapsed={isCollapsed}
      onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      searchInput={
        <Input
          placeholder="ابحث عن العلامة التجارية"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      }
      renderItem={(item) => {
        const fullItem = items.find(
          (i) => (i.arabicName || i.name) === item.name
        );
        const isSelected = fullItem
          ? activeFilters.brandIds?.includes(fullItem.id)
          : false;

        return (
          <>
            <div className="flex items-center gap-2">
              <Checkbox
                id={`brand-${fullItem?.id}`}
                checked={isSelected}
                onCheckedChange={() =>
                  fullItem && handleBrandToggle(fullItem.id)
                }
              />
              <label
                htmlFor={`brand-${fullItem?.id}`}
                className="text-gray-700 cursor-pointer"
              >
                {item.name}
              </label>
            </div>
            <span className="text-gray-500 text-sm">({item.count})</span>
          </>
        );
      }}
    />
  );
}

export function ConnectedRatingFilterSection() {
  const dispatch = useAppDispatch();
  const { updateURL } = useFilterParams();
  const { activeFilters, metadata } = useAppSelector((state) => state.filters);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const handleRatingChange = (rating: number) => {
    // If the rating is already selected, unselect it
    if (activeFilters.rating === rating) {
      const newFilters = { ...activeFilters };
      delete newFilters.rating;
      dispatch(setFilter({ rating: undefined }));
      updateURL(newFilters);
    } else {
      // Otherwise, select the new rating
      const newFilters = { ...activeFilters, rating };
      dispatch(setFilter({ rating }));
      updateURL(newFilters);
    }
  };

  // Get rating counts from metadata
  const ratingCounts = useMemo(() => metadata?.ratings || [], [metadata]);

  return (
    <RatingFilterSection
      title="تسوق بالتقييم"
      isCollapsed={isCollapsed}
      onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
      selectedRating={activeFilters.rating || 0}
      onRatingSelect={handleRatingChange}
      ratingCounts={ratingCounts}
    />
  );
}
