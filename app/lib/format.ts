import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

export function formatDate(date: string) {
  return format(parseISO(date), "MMM d, yyyy", { locale: enUS });
}

export function formatMonthDay(date: string) {
  return format(parseISO(date), "MMM d", { locale: enUS });
}

export function formatDuration(duration?: string) {
  if (!duration) return null;
  const value = duration.trim();
  if (value === "-") return null;
  const minutes = value.match(/^(\d+)\s*min$/i);
  if (minutes) return `${minutes[1]} min`;
  const hours = value.match(/^(\d+)\s*h(?:r|our)?s?$/i);
  if (hours) return `${hours[1]} hr`;
  return value;
}
