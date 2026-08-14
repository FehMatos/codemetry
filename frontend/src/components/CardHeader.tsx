import type { LucideIcon } from "lucide-react";

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
}

export default function CardHeader({
  title,
  subtitle,
  icon: Icon,
}: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-sm font-medium text-text-primary">{title}</h3>

        {subtitle && (
          <p className="mt-1 text-xs text-text-secondary">{subtitle}</p>
        )}
      </div>

      <Icon className="h-5 w-5 text-primary" />
    </div>
  );
}
