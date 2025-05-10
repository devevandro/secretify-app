"use client";

import { X } from "lucide-react";
import { useRef, useEffect } from "react";

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewChange: (type: "all" | "type") => void;
  currentView: "all" | "type";
  position?: { top: number; left: number; right: number };
  isDesktop: boolean;
}

export default function SortModal({
  isOpen,
  onClose,
  onViewChange,
  currentView,
  position,
  isDesktop,
}: SortModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    if (modalRef.current && isOpen && position && isDesktop) {
      const rect = modalRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;

      if (position.left + rect.width > viewportWidth) {
        modalRef.current.style.left = "auto";
        modalRef.current.style.right = `${position.right}px`;
      } else {
        modalRef.current.style.left = `${position.left}px`;
        modalRef.current.style.right = "auto";
      }

      modalRef.current.style.top = `${position.top}px`;
    }
  }, [isOpen, position, isDesktop]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 ${
        !isDesktop
          ? "bg-black/50 flex items-start justify-center pt-16 md:pt-20"
          : ""
      }`}
    >
      <div
        ref={modalRef}
        className={`w-64 md:w-80 bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-800 ${
          isDesktop ? "absolute" : ""
        }`}
        style={isDesktop && position ? {} : undefined}
      >
        <div className="p-3 md:p-4">
          <div className="flex justify-between items-center mb-3 md:mb-4">
            <h3 className="text-white text-base md:text-lg font-medium">
              Ordenar Itens
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200"
            >
              <X className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>

          <div className="space-y-2 md:space-y-3">
            <button
              className="w-full flex items-center justify-between p-2 rounded hover:bg-[#252525] transition-colors"
              onClick={() => {
                onViewChange("all");
                onClose();
              }}
            >
              <span className="text-gray-200 text-sm md:text-base">
                Exibir tudo
              </span>
              <div
                className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border ${
                  currentView === "all"
                    ? "border-[#6eb5e6] bg-[#6eb5e6]"
                    : "border-gray-500"
                }`}
              >
                {currentView === "all" && (
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full m-auto mt-0.5" />
                )}
              </div>
            </button>

            <button
              className="w-full flex items-center justify-between p-2 rounded hover:bg-[#252525] transition-colors"
              onClick={() => {
                onViewChange("type");
                onClose();
              }}
            >
              <span className="text-gray-200 text-sm md:text-base">
                Exibir por tipos
              </span>
              <div
                className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border ${
                  currentView === "type"
                    ? "border-[#6eb5e6] bg-[#6eb5e6]"
                    : "border-gray-500"
                }`}
              >
                {currentView === "type" && (
                  <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-white rounded-full m-auto mt-0.5" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
