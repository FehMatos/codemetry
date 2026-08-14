import type { ReactNode } from "react";
import clsx from "clsx";

type CardSize = "sm" | "md" | "lg";

interface CardProps {
  size: CardSize;
  children: ReactNode;
  className?: string;
}

const sizes = {
  sm: "h-38",
  md: "h-76",
  lg: "h-96",
};

function Card({ children, className, size }: CardProps) {
  return (
    <div
      className={clsx(
        `${sizes[size]} bg-surface-secondary border border-border rounded-xl p-6`,
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
