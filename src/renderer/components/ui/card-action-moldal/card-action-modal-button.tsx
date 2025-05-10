"use client";

import type React from "react";

export function CardActionModalButton({
  label,
  children,
  onClick,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={`w-full flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm ${
        label === "Excluir" ? "text-red-400" : "text-[#626262]"
      } hover:bg-[#333333] transition-colors cursor-pointer`}
      onClick={onClick}
    >
      {children}
      {label}
    </button>
  );
}
