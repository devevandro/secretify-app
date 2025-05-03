"use client";

import type React from "react";

export function SidebarProfileItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) {
  return (
    <div className="py-1 md:py-2">
      <button
        className="w-full flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-400 hover:bg-gray-800"
        onClick={onClick}
      >
        {icon}
        {label}
      </button>
    </div>
  );
}
