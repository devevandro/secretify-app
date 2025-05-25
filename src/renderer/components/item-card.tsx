"use client";

import type React from "react";

import { useState, useRef } from "react";
import { toast } from "sonner";
import CardActionModal from "./card-action-modal";
import PasswordDetailsModal from "./item-details-modal";
import ListItemCard from "./ui/item-card/list-item-card";
import GridItemCard from "./ui/item-card/grid-item-card";

interface ItemCardProps {
  id: string;
  type: string;
  iconUrl?: string;
  name: string;
  url?: string;
  description: string;
  listView?: boolean;
  onDelete: (id: string) => void;
  onClick?: () => void;
}

export default function ItemCard({
  id,
  type,
  iconUrl,
  name,
  url,
  description,
  listView,
  onDelete,
  onClick,
}: ItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  const passwordDetails = {
    title: name,
    category:
      status === "senha compartilhada"
        ? "Senha Compartilhada"
        : "Senha Privada",
    permissions: "Apenas Visualização",
    creationDate: "03/04/2025",
    creationTime: "14:00",
    author: "EvandroDev",
    sharingLink:
      status === "senha compartilhada"
        ? `www.secritfy.com/innovadev198`
        : undefined,
  };

  const handleToggleFavorite = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    try {
      setIsFavorite(!isFavorite);

      if (Math.random() > 0.8) {
        throw new Error("Falha ao salvar favorito");
      }

      toast.success(
        `${name} ${!isFavorite ? "adicionado aos" : "removido dos"} favoritos`,
        {
          duration: 4000,
          className:
            "bg-green-600 text-white border-green-700 py-2 px-3 text-sm slide-in-from-right",
        }
      );
    } catch (error) {
      setIsFavorite(isFavorite);

      toast.error("Não foi possível salvar o favorito", {
        duration: 4000,
        className: "slide-in-from-right",
      });
    }
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (moreButtonRef.current) {
      const rect = moreButtonRef.current.getBoundingClientRect();

      const isMobile = window.innerWidth < 768;

      setModalPosition({
        top: rect.bottom + 5,
        left: isMobile ? Math.max(5, rect.left - 100) : rect.left - 120,
      });
    }

    setIsModalOpen(true);
  };

  const handleEdit = () => {
    toast.info(`Editando ${name}`, {
      duration: 3000,
      className: "slide-in-from-right",
    });
  };

  const handleDelete = () => {
    onDelete(id);
    toast.success(`${name} excluído`, {
      duration: 3000,
      className:
        "bg-green-600 text-white border-green-700 = text-sm slide-in-from-right",
    });
  };

  const handleShowDetails = () => {
    setIsDetailsModalOpen(true);
  };

  if (listView) {
    return (
      <div
        className="overflow-hidden custom-scrollbar group relative cursor-pointer flex bg-[#1e1e1e] hover:bg-[#252525] border-b-2 border-[#141414] transition-colors duration-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          if (e.target !== moreButtonRef.current && onClick) {
            onClick();
          }
        }}
      >
        <ListItemCard
          name={name}
          isFavorite={isFavorite}
          isHovered={isHovered}
          iconUrl={iconUrl}
          description={description}
          handleToggleFavorite={handleToggleFavorite}
        />
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden custom-scrollbar group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GridItemCard
        name={name}
        isFavorite={isFavorite}
        isHovered={isHovered}
        iconUrl={iconUrl}
        description={description}
        moreButtonRef={moreButtonRef}
        handleMoreClick={handleMoreClick}
        handleToggleFavorite={handleToggleFavorite}
      />

      <CardActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onFavorite={handleToggleFavorite}
        onDetails={handleShowDetails}
        isFavorite={isFavorite}
        position={modalPosition}
      />

      <PasswordDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        position={modalPosition}
        passwordDetails={passwordDetails}
      />
    </div>
  );
}
