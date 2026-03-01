import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border-2 border-[hsl(var(--border))] px-2.5 py-0.5 text-xs font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]",
        secondary:
          "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]",
        destructive:
          "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))]",
        outline: "bg-[hsl(var(--card))] text-[hsl(var(--foreground))]",
        success:
          "bg-emerald-100 text-emerald-800 border-emerald-800/25",
        warning:
          "bg-amber-100 text-amber-800 border-amber-800/25",
        info:
          "bg-sky-100 text-sky-800 border-sky-800/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
