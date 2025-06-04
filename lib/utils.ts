import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a number with commas as thousands separators
 * @param value The number to format
 * @returns Formatted string with commas
 */
export function formatNumber(value: number): string {
  return value.toLocaleString()
}
