import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  className?: string;
  size?: number;
}

export default function LoadingSpinner({
  fullScreen = false,
  className,
  size = 24,
}: LoadingSpinnerProps) {
  if (fullScreen) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2
          className={cn("animate-spin text-[hsl(var(--primary))]", className)}
          size={size}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <Loader2
        className={cn("animate-spin text-[hsl(var(--primary))]", className)}
        size={size}
      />
    </div>
  );
}
