import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses = "font-medium rounded-lg transition-all";

  const variantClasses = {
    primary: "bg-primary hover:bg-opacity-90 text-white",
    secondary: "bg-secondary hover:bg-opacity-90 text-white",
    outline:
      "border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-white hover:bg-white hover:bg-opacity-10",
  };

  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-3 px-6",
    lg: "py-4 px-8 text-lg",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
