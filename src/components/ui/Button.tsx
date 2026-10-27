import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "cyan" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isExternal?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  icon,
  iconPosition = "right",
  isExternal = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5 tracking-wider uppercase",
    md: "text-sm px-6 py-2.5 gap-2 tracking-wider uppercase font-semibold",
    lg: "text-base px-8 py-3.5 gap-2.5 tracking-wider uppercase font-semibold"
  };

  const variantStyles = {
    primary:
      "bg-white text-slate-950 hover:bg-slate-100 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] border border-white/80",
    secondary:
      "bg-slate-900/60 text-slate-200 border border-slate-700/80 hover:border-cyan-400/80 hover:text-white hover:bg-slate-800/80 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] backdrop-blur-md",
    cyan:
      "bg-cyan-400 text-slate-950 font-bold hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.5)] border border-cyan-300",
    ghost:
      "bg-transparent text-slate-300 hover:text-cyan-300 hover:bg-slate-800/40 border border-transparent hover:border-slate-800"
  };

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="transition-transform group-hover:-translate-x-0.5">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </>
  );

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} group ${className}`;

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
}
