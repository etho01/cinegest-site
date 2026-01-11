import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formate une date ISO en format français lisible
 * @param isoDate - Date au format ISO 8601 (ex: "2012-04-25T00:00:00.000000Z")
 * @returns Date formatée (ex: "25 avril 2012")
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}