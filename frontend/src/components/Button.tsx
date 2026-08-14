import type { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

const variants = {
  primary: "bg-primary hover:bg-primary-hover text-white",

  secondary:
    "bg-surface border border-border hover:bg-surface-secondary text-text-primary",

  ghost: "bg-transparent hover:bg-surface text-text-secondary",
};

function Button({ children, variant = "primary", className }: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-lg px-4 py-2 font-medium transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
