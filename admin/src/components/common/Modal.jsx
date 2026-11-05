import React, { useEffect } from "react";
import { X } from "lucide-react";

const sizeMap = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-5xl",
  "2xl": "max-w-6xl",
  "3xl": "max-w-7xl",
  full: "max-w-[95vw]",
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth,
  size,
  position = "center",
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const computedMaxWidth = maxWidth || (size ? sizeMap[size] || size : "max-w-2xl");

  if (position === "right") {
    return (
      <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm overflow-hidden">
        {/* Backdrop overlay */}
        <div
          className="fixed inset-0 cursor-pointer"
          onClick={onClose}
          aria-hidden="true"
        />
        {/* Right side half-screen panel */}
        <div className="relative w-full md:w-1/2 lg:w-1/2 h-full bg-[#080f22] border-l border-sky-500/30 shadow-[-20px_0_60px_rgba(0,0,0,0.85)] flex flex-col z-10 animate-in slide-in-from-right duration-300">
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4.5 border-b border-white/10 bg-[#060c1c] shrink-0">
            <h3 className="text-base font-semibold text-white tracking-wide uppercase font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              {title}
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative w-full ${computedMaxWidth} bg-[#080f22] border border-sky-500/25 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden z-10 my-8 animate-in fade-in zoom-in-95 duration-200`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#060c1c]">
          <h3 className="text-base font-semibold text-white tracking-wide uppercase font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
