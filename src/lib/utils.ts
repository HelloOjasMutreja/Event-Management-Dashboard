import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":");
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}

export function formatDateTime(dateStr: string, timeStr: string): string {
  return `${formatDate(dateStr)} at ${formatTime(timeStr)}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "published":
      return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20";
    case "draft":
      return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20";
    case "cancelled":
      return "bg-red-500/15 text-red-400 border border-red-500/20";
    case "completed":
      return "bg-blue-500/15 text-blue-400 border border-blue-500/20";
    default:
      return "bg-gray-500/15 text-gray-400 border border-gray-500/20";
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case "Workshop":
      return "bg-purple-500/15 text-purple-400 border border-purple-500/20";
    case "Social":
      return "bg-pink-500/15 text-pink-400 border border-pink-500/20";
    case "Competition":
      return "bg-orange-500/15 text-orange-400 border border-orange-500/20";
    case "Seminar":
      return "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20";
    default:
      return "bg-gray-500/15 text-gray-400 border border-gray-500/20";
  }
}
