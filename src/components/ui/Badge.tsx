import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "cyan" | "blue" | "indigo" | "amber" | "outline" | "radar";
  size?: "sm" | "md";
  className?: string;
  glow?: boolean;
}

export default function Badge({
  children,
  variant = "cyan",
  size = "md",
  className = "",
  glow = false
}: BadgeProps) {
  const variantStyles = {
    cyan: "bg-cyan-950/60 text-cyan-300 border-cyan-500/30",
    blue: "bg-sky-950/60 text-sky-300 border-sky-500/30",
    indigo: "bg-indigo-950/60 text-indigo-300 border-indigo-500/30",
    amber: "bg-amber-950/60 text-amber-300 border-amber-500/30",
    outline: "bg-slate-900/40 text-slate-300 border-slate-700/60",
    radar: "bg-cyan-950/80 text-cyan-200 border-cyan-400/50 relative overflow-hidden"
  };

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 tracking-widest font-mono",
    md: "text-xs px-2.5 py-1 tracking-wider font-mono font-medium"
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border uppercase select-none transition-all ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${glow ? "shadow-[0_0_12px_rgba(0,229,255,0.3)]" : ""} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {children}
    </span>
  );
}
