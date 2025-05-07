"use client";

import type React from "react";

import { MoreVertical, Star } from "lucide-react";
import { useState, useRef } from "react";
import { toast } from "sonner";
import CardActionModal from "./card-action-modal";
import PasswordDetailsModal from "./password-details-modal";

// Add onClick to the interface
interface PasswordCardProps {
  id: string;
  icon: string;
  iconUrl?: string;
  name: string;
  user?: string;
  status?: string;
  color?: string;
  listView?: boolean;
  initialFavorite?: boolean;
  onDelete: (id: string) => void;
  onClick?: () => void;
}

// Update the function parameters to include onClick
export default function PasswordCard({
  id,
  icon,
  iconUrl,
  name,
  user,
  status,
  color = "bg-gray-600",
  listView = false,
  initialFavorite = false,
  onDelete,
  onClick,
}: PasswordCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const moreButtonRef = useRef<HTMLButtonElement>(null);

  // Mock password details
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
      // Toggle favorite status
      setIsFavorite(!isFavorite);

      // Simulate API call that could potentially fail
      if (Math.random() > 0.8) {
        throw new Error("Falha ao salvar favorito");
      }

      // Show success toast with green color
      toast.success(
        `${name} ${!isFavorite ? "adicionado aos" : "removido dos"} favoritos`,
        {
          duration: 4000,
          className:
            "bg-green-600 text-white border-green-700 py-2 px-3 text-sm slide-in-from-right",
        }
      );
    } catch (error) {
      // Revert state on error
      setIsFavorite(isFavorite);

      // Show error toast
      toast.error("Não foi possível salvar o favorito", {
        duration: 4000,
        className: "slide-in-from-right",
      });
    }
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Calculate position for the modal
    if (moreButtonRef.current) {
      const rect = moreButtonRef.current.getBoundingClientRect();

      // Adjust position based on screen size
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
        "bg-green-600 text-white border-green-700 py-2 px-3 text-sm slide-in-from-right",
    });
  };

  const handleShowDetails = () => {
    setIsDetailsModalOpen(true);
  };

  if (listView) {
    // List view layout
    return (
      <div
        className="overflow-hidden custom-scrollbar group relative cursor-pointer flex bg-[#1e1e1e] hover:bg-[#252525] transition-colors duration-200 rounded-[10px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          // Only trigger onClick if we're not clicking on the more button or star
          if (e.target !== moreButtonRef.current && onClick) {
            onClick();
          }
        }}
      >
        {/* Icon section with favorite star */}
        <div
          className={`p-2 md:p-3 flex justify-center items-center bg-[#2a2a2a] group-hover:bg-[#333333] transition-colors duration-200 rounded-l-[10px] relative`}
        >
          {/* Favorite star icon that appears on hover - positioned within the icon section */}
          <div
            className={`absolute top-1 left-1 text-gray-500 transition-opacity duration-200 ${
              isHovered || isFavorite ? "opacity-100" : "opacity-0"
            } z-10`}
            onClick={(e) => handleToggleFavorite(e)}
          >
            <Star
              className={`h-3 w-3 md:h-3.5 md:w-3.5 cursor-pointer ${
                isFavorite
                  ? "text-[#6eb5e6] fill-[#6eb5e6]"
                  : "hover:text-[#6eb5e6]"
              }`}
            />
          </div>

          {iconUrl ? (
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center ${color}`}
            >
              <img
                src={iconUrl || "/placeholder.svg"}
                alt={name}
                width={24}
                height={24}
                className="object-contain w-5 h-5 md:w-6 md:h-6"
              />
            </div>
          ) : (
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center ${color}`}
            >
              <span className="text-white text-base md:text-lg font-bold">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="flex-1 px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
          <div>
            <h3 className="font-medium text-sm md:text-base">{name}</h3>
            <p className="text-xs md:text-sm text-gray-400">{user || status}</p>
          </div>
          <button
            ref={moreButtonRef}
            className="text-gray-400 hover:text-gray-200"
            onClick={handleMoreClick}
          >
            <MoreVertical className="h-4 w-4 md:h-5 md:w-5" />
          </button>
        </div>

        {/* Action Modal */}
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

        {/* Details Modal */}
        <PasswordDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          position={modalPosition}
          passwordDetails={passwordDetails}
        />
      </div>
    );
  }

  // Grid view layout (original)
  return (
    <div
      className="overflow-hidden custom-scrollbar group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top section with gray background and rounded corners */}
      <div className="bg-[#2a2a2a] p-4 md:p-6 flex justify-center items-center rounded-t-[10px] group-hover:bg-[#333333] transition-colors duration-200">
        {/* Favorite star icon that appears on hover - lighter gray color */}
        <div
          className={`absolute top-1.5 left-1.5 md:top-2 md:left-2 text-gray-500 transition-opacity duration-200 ${
            isHovered || isFavorite ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => handleToggleFavorite(e)}
        >
          <Star
            className={`h-4 w-4 md:h-5 md:w-5 cursor-pointer ${
              isFavorite
                ? "text-[#6eb5e6] fill-[#6eb5e6]"
                : "hover:text-[#6eb5e6] hover:opacity-100"
            }`}
          />
        </div>

        {iconUrl ? (
          <div
            className={`w-12 h-12 md:w-16 md:h-16 rounded-md flex items-center justify-center ${color}`}
          >
            <img
              src={iconUrl || "/placeholder.svg"}
              alt={name}
              width={40}
              height={40}
              className="object-contain w-8 md:w-10 h-10"
            />
          </div>
        ) : (
          <div
            className={`w-12 h-12 md:w-16 md:h-16 rounded-md flex items-center justify-center ${color}`}
          >
            <span className="text-white text-xl md:text-2xl font-bold">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Bottom section with project background */}
      <div className="px-3 md:px-4 pb-3 md:pb-4 pt-2 md:pt-3 flex items-start justify-between bg-[#1e1e1e] group-hover:bg-[#252525] transition-all duration-200 rounded-b-[10px]">
        <div>
          <h3 className="font-medium text-sm md:text-base">{name}</h3>
          <p className="text-xs md:text-sm text-gray-400 truncate max-w-[100px] md:max-w-[150px]">
            {user || status}
          </p>
        </div>
        <button
          ref={moreButtonRef}
          className="text-gray-400 hover:text-gray-200"
          onClick={handleMoreClick}
        >
          <MoreVertical className="h-4 w-4 md:h-5 md:w-5" />
        </button>
      </div>

      {/* Action Modal */}
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

      {/* Details Modal */}
      <PasswordDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        position={modalPosition}
        passwordDetails={passwordDetails}
      />
    </div>
  );
}
