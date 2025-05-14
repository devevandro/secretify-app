"use client";

import { Terminal, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { ImgIcon } from "./img-icon";
import { SidebarFooter } from "./sidebar-footer";
import { SidebarItem } from "./sidebar-item";

export function SidebarNavigation({
  isOpen,
  isProfileVisible,
  handleShowProfile,
}: {
  isOpen: boolean;
  isProfileVisible: boolean;
  handleShowProfile: () => void;
}) {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <nav className="flex-1 flex flex-col mt-2 md:mt-4 overflow-y-auto custom-scrollbar custom-scrollbar">
      <div className="flex-1">
        {isOpen && !isProfileVisible && (
          <div className="px-2 md:px-3 mb-1 md:mb-2">
            <button
              onClick={handleShowProfile}
              className="w-full flex items-center p-1.5 md:p-2 hover:bg-gray-800 rounded-md text-gray-400 hover:text-gray-200 text-xs md:text-sm"
            >
              <User className="h-4 w-4 md:h-5 md:w-5 mr-2 md:mr-3" />
              Mostrar Perfil
            </button>
          </div>
        )}

        <SidebarItem
          icon={
            <ImgIcon
              src={
                currentPath === "/dashboard"
                  ? "history-blue.svg"
                  : "history-gray.svg"
              }
            />
          }
          label="Recentes"
          isOpen={isOpen}
          href="/dashboard"
          isActive={currentPath === "/dashboard"}
        />

        <SidebarItem
          icon={
            <ImgIcon
              src={
                currentPath === "/favorites"
                  ? "favorite-blue.svg"
                  : "favorite-gray.svg"
              }
            />
          }
          label="Meus Favoritos"
          isOpen={isOpen}
          href="/favorites"
          isActive={currentPath === "/favorites"}
        />
        <SidebarItem
          icon={
            <ImgIcon
              src={
                currentPath === "/favorites" ? "key-blue.svg" : "key-gray.svg"
              }
            />
          }
          label="Senhas de Acessos"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<ImgIcon src="link-gray.svg" />}
          label="Sites Favoritos"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<ImgIcon src="share-gray.svg" />}
          label="Chaves de Acesso"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<ImgIcon src="share-gray.svg" />}
          label="Conexão Banco de Dados"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<Terminal className="h-4 w-4 md:h-5 md:w-5" />}
          label="Comandos"
          isOpen={isOpen}
        />

        <div
          className={`${
            isOpen ? "mx-3" : "mx-auto w-6 md:w-8"
          } my-2 md:my-3 border-t border-[#292929]`}
        ></div>
      </div>

      <SidebarFooter isOpen={isOpen} />
    </nav>
  );
}
