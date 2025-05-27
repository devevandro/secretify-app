"use client";

import { useRef, useEffect } from "react";
import { LinkIcon } from "lucide-react";
import { ItemCardDetailsModal } from "./ui/item-card/item-card-details-modal";

interface ItemDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
  itemDetails: {
    title: string;
    category: string;
    permissions: string;
    creationDate: string;
    creationTime: string;
    author: string;
    sharingLink?: string;
  };
}

export function ItemDetailsModal({
  isOpen,
  onClose,
  position,
  itemDetails,
}: ItemDetailsModalProps) {
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
      className="fixed z-50 bg-[#1a1a1a] rounded-md shadow-lg border border-[#292929] w-72 md:w-80 overflow-hidden custom-scrollbar"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      <div className="p-4">
        <div className="space-y-3">
          <ItemCardDetailsModal label="Título:" text={itemDetails.title} />
          <ItemCardDetailsModal
            label="Categoria:"
            text={itemDetails.category}
          />
          <ItemCardDetailsModal
            label="Permissões Da Senha:"
            text={itemDetails.permissions}
          />
          <ItemCardDetailsModal
            label="Data Da Criação:"
            text={itemDetails.creationDate}
          />
          <ItemCardDetailsModal
            label="Hora Da Criação:"
            text={itemDetails.creationTime}
          />
          <ItemCardDetailsModal label="Autor:" text={itemDetails.author} />
        </div>

        {itemDetails.sharingLink && (
          <>
            <div className="my-4 border-t border-[#292929]"></div>
            <div>
              <h4 className="text-white text-sm font-medium mb-2">
                Link de Compartilhamento
              </h4>
              <div className="flex items-center bg-[#2a2a2a] rounded p-2">
                <LinkIcon className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                <p className="text-[#58beee] text-sm truncate">
                  {itemDetails.sharingLink}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
