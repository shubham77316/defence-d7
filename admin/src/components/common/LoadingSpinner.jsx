import React from "react";

export default function LoadingSpinner({ size = "md", text = "Loading..." }) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-3">
      <div
        className={`${sizeClasses[size] || sizeClasses.md} rounded-full border-sky-400/20 border-t-sky-400 animate-spin`}
      />
      {text && <span className="text-xs font-mono text-slate-400 tracking-wider uppercase">{text}</span>}
    </div>
  );
}
