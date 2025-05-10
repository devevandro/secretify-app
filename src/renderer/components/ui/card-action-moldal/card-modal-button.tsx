"use client";

import { useRef, useEffect } from "react";
import { Edit, Trash2, Star, Info } from "lucide-react";

interface CardModalButtonProps {
  label: string;
  children: React.ReactNode;
}

export default function CardModalButton({
  label,
  children,
}: CardModalButtonProps) {
  return (
    <div className="py-1">
      <button className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-[#252525] transition-colors cursor-pointer">
        {children}
        <span>{label}</span>
      </button>
    </div>
  );
}
