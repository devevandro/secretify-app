"use client";

import type React from "react";
import { Link } from "react-router-dom";

export function SidebarItem({
  icon,
  label,
  isOpen,
  href = "#",
  isActive = false,
}: {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  href?: string;
  isActive?: boolean;
}) {
  return (
    <div
      className={`${
        isOpen ? "px-2 md:px-3" : "px-0 flex justify-center"
      } mb-0.5 md:mb-1`}
    >
      <Link
        to={href}
        className={`${
          isOpen
            ? "w-full justify-start"
            : "w-8 h-8 md:w-10 md:h-10 justify-center"
        } flex items-center ${
          isOpen ? "p-1.5 md:p-2" : "p-0"
        } hover:bg-gray-800 rounded-md ${
          isActive ? "text-[#58BFF5] bg-[#2a4b5c]" : "text-[#626262]"
        } hover:text-gray-200 text-xs md:text-sm`}
      >
        <span className={isOpen ? "mr-2 md:mr-3" : ""}>{icon}</span>
        {isOpen && label}
      </Link>
    </div>
  );
}
