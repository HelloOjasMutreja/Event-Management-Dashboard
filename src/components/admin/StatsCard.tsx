import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: { value: number; isPositive: boolean };
  iconColor?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  iconColor = "text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/5",
}: StatsCardProps) {
  return (
    <Card className="transition-all hover:shadow-md hover:shadow-black/[0.03]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-[hsl(var(--muted-foreground))]">
          {title}
        </CardTitle>
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconColor}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {trend && (
          <div className={`mt-1 flex items-center gap-1 text-xs font-medium ${trend.isPositive ? "text-emerald-600" : "text-red-600"}`}>
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{trend.isPositive ? "+" : ""}{trend.value}%</span>
          </div>
        )}
        {description && (
          <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
