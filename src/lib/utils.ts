import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ProductFilters } from "@api/products";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truthyParams = (params: ProductFilters) => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => !!value)
  );
};

export const createChunks = <T>(arr: T[], size: number) => {
  let index = 0;
  const chunks: T[][] = [];
  const length = arr.length;
  while (index < length) {
    let start = index;
    let end = start + size;
    if (end > length) {
      start = length - size;
      end = length;
      chunks.push(arr.slice(start, end));
      break;
    }
    chunks.push(arr.slice(start, end));
    index = end;
  }
  return chunks;
};
