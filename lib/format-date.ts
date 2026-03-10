import { format, parseISO, isValid } from "date-fns"
import { pt } from "date-fns/locale"

/**
 * Formats a date string (ISO or YYYY-MM-DD) into Portuguese long format.
 * e.g. "2026-03-10" → "10 de março de 2026"
 */
export function formatDate(dateStr: string | null | undefined): string {
    if (!dateStr) return ""
    try {
        // Try parsing as ISO first, then as plain date
        const date = parseISO(dateStr)
        if (isValid(date)) {
            return format(date, "d 'de' MMMM 'de' yyyy", { locale: pt })
        }
    } catch {
        // fallback
    }
    return dateStr
}
