import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProductFilters } from "./api/products";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truthyParams = (params: ProductFilters) => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => !!value)
  );
};
