import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-[hsl(var(--background))] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-[hsl(var(--border))]",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0 active:shadow-none",
        destructive:
          "bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0 active:shadow-none",
        outline:
          "bg-[hsl(var(--card))] text-[hsl(var(--foreground))] shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal hover:bg-[hsl(var(--muted))] active:translate-y-0 active:shadow-none",
        secondary:
          "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] shadow-brutal-sm hover:-translate-y-0.5 hover:shadow-brutal active:translate-y-0 active:shadow-none",
        ghost:
          "border-transparent shadow-none hover:bg-[hsl(var(--muted))]",
        link: "border-transparent shadow-none text-[hsl(var(--primary))] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, isLoading = false, children, disabled, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
