import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = "No items found",
  description = "There's nothing here yet.",
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon || (
        <Inbox className="h-16 w-16 text-[hsl(var(--muted-foreground))]/50" />
      )}
      <h3 className="mt-4 text-lg font-semibold text-[hsl(var(--foreground))]">
        {title}
      </h3>
      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
        {description}
      </p>
    </div>
  );
}
