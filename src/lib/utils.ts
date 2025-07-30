import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function formatNumber(num: number): string {
  if (!Number.isFinite(num)) {
    return num.toString();
  }

  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum >= 1000000) {
    return sign + (absNum / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (absNum >= 1000) {
    return sign + (absNum / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
