"use client";

import { useRef, useEffect } from "react";
import { Edit, Trash2, Star, Info } from "lucide-react";

interface CardActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onFavorite: () => void;
  onDetails: () => void;
  isFavorite: boolean;
  position: { top: number; left: number };
}

export default function CardActionModal({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onFavorite,
  onDetails,
  isFavorite,
  position,
}: CardActionModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
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

  // Adjust position for mobile screens
  useEffect(() => {
    if (modalRef.current && isOpen) {
      const rect = modalRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Check if modal is outside viewport
      if (rect.right > viewportWidth) {
        const newLeft = Math.max(5, viewportWidth - rect.width - 5);
        modalRef.current.style.left = `${newLeft}px`;
      }

      if (rect.bottom > viewportHeight) {
        const newTop = Math.max(5, viewportHeight - rect.height - 5);
        modalRef.current.style.top = `${newTop}px`;
      }
    }
  }, [isOpen, position]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed z-50 bg-[#2a2a2a] rounded-md shadow-lg border border-gray-700 w-36 md:w-40 overflow-hidden"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="py-1">
        <button
          className="w-full flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-300 hover:bg-[#333333] transition-colors"
          onClick={() => {
            onDetails();
            onClose();
          }}
        >
          <Info className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:mr-3" />
          Detalhes
        </button>

        <button
          className="w-full flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-300 hover:bg-[#333333] transition-colors"
          onClick={() => {
            onEdit();
            onClose();
          }}
        >
          <Edit className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:mr-3" />
          Editar
        </button>

        <button
          className="w-full flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-300 hover:bg-[#333333] transition-colors"
          onClick={() => {
            onFavorite();
            onClose();
          }}
        >
          <Star
            className={`h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:mr-3 ${
              isFavorite ? "text-[#6eb5e6] fill-[#6eb5e6]" : ""
            }`}
          />
          {isFavorite ? "Remover favorito" : "Favoritar"}
        </button>

        <div className="my-1 border-t border-gray-700"></div>

        <button
          className="w-full flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-red-400 hover:bg-[#333333] transition-colors"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:mr-3" />
          Excluir
        </button>
      </div>
    </div>
  );
}
