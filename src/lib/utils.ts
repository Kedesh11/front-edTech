import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine et optimise les classes CSS avec clsx et tailwind-merge
 * @param inputs - Classes CSS à combiner
 * @returns Classes CSS optimisées
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formate une date en format français
 * @param date - Date à formater
 * @returns Date formatée
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formate une date et heure en format français
 * @param date - Date à formater
 * @returns Date et heure formatées
 */
export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Génère un ID unique
 * @returns ID unique
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Valide une adresse email
 * @param email - Email à valider
 * @returns true si l'email est valide
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Met en majuscule la première lettre d'une chaîne
 * @param str - Chaîne à capitaliser
 * @returns Chaîne capitalisée
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Limite une chaîne à une longueur donnée
 * @param str - Chaîne à tronquer
 * @param length - Longueur maximale
 * @returns Chaîne tronquée
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
} 