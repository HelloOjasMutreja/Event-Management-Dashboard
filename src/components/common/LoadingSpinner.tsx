import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SpinnerSize = "sm" | "md" | "lg";

const sizeMap: Record<SpinnerSize, number> = {
  sm: 16,
  md: 24,
  lg: 36,
};

interface LoadingSpinnerProps {
  className?: string;
  size?: SpinnerSize;
}

export function LoadingSpinner({
  className,
  size = "md",
}: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <Loader2
        className={cn("animate-spin text-[hsl(var(--primary))]", className)}
        size={sizeMap[size]}
      />
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2
        className="animate-spin text-[hsl(var(--primary))]"
        size={36}
      />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-lg border bg-[hsl(var(--card))] p-4">
      <div className="mb-4 h-40 rounded bg-[hsl(var(--muted))]" />
      <div className="mb-2 h-4 w-3/4 rounded bg-[hsl(var(--muted))]" />
      <div className="mb-4 h-3 w-1/2 rounded bg-[hsl(var(--muted))]" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-[hsl(var(--muted))]" />
        <div className="h-3 w-full rounded bg-[hsl(var(--muted))]" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
