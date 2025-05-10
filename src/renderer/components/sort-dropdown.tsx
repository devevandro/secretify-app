"use client";

import { X } from "lucide-react";
import { useRef, useEffect } from "react";

interface SortDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onSortChange: (type: "all" | "type") => void;
  currentSort: "all" | "type";
}

export default function SortDropdown({
  isOpen,
  onClose,
  onSortChange,
  currentSort,
}: SortDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-12 w-64 bg-[#2a2a2a] rounded-lg shadow-lg border border-gray-700 z-50"
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-lg font-medium">Ordenar Itens</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          <button
            className="w-full flex items-center justify-between p-2 rounded hover:bg-[#333333] transition-colors"
            onClick={() => onSortChange("all")}
          >
            <span className="text-gray-200">Exibir tudo</span>
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                currentSort === "all"
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-500"
              }`}
            >
              {currentSort === "all" && (
                <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-0.5" />
              )}
            </div>
          </button>

          <button
            className="w-full flex items-center justify-between p-2 rounded hover:bg-[#333333] transition-colors"
            onClick={() => onSortChange("type")}
          >
            <span className="text-gray-200">Exibir por tipos</span>
            <div
              className={`w-4 h-4 rounded-full border-2 ${
                currentSort === "type"
                  ? "border-blue-500 bg-blue-500"
                  : "border-gray-500"
              }`}
            >
              {currentSort === "type" && (
                <div className="w-1.5 h-1.5 bg-white rounded-full m-auto mt-0.5" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
