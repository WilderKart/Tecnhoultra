import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combina clases de Tailwind de forma inteligente, resolviendo conflictos.
 * @param inputs - Clases CSS condicionales o estáticas
 * @returns String de clases optimizado
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
