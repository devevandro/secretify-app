"use client";

import { useRef, useEffect } from "react";
import { Edit, Trash2, Star, Info } from "lucide-react";
import { CardActionModalButton } from "./ui/card-action-moldal/card-action-modal-button";

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
    if (modalRef.current && isOpen) {
      const rect = modalRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

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
      className="fixed z-50 bg-[#141414] rounded-md shadow-lg border border-[#292929] w-36 md:w-40 overflow-hidden custom-scrollbar"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="py-1">
        <CardActionModalButton
          children={<Info className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:mr-3" />}
          label="Detalhes"
          onClick={() => {
            onDetails();
            onClose();
          }}
        />

        <CardActionModalButton
          label="Editar"
          children={<Edit className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:mr-3" />}
          onClick={() => {
            onEdit();
            onClose();
          }}
        />

        <CardActionModalButton
          label={isFavorite ? "Remover favorito" : "Favoritar"}
          children={
            <Star
              className={`h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:mr-3 ${
                isFavorite ? "text-[#6eb5e6] fill-[#6eb5e6]" : ""
              }`}
            />
          }
          onClick={() => {
            onFavorite();
            onClose();
          }}
        />

        <div className="my-1 border-t border-[#292929]"></div>

        <CardActionModalButton
          label="Excluir"
          children={
            <Trash2 className="h-3.5 w-3.5 md:h-4 md:w-4 mr-2 md:mr-3 " />
          }
          onClick={() => {
            onDelete();
            onClose();
          }}
        />
      </div>
    </div>
  );
}
