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

        <div
          className={`${
            isOpen ? "px-2 md:px-3" : "px-0 flex justify-center"
          } mb-1 md:mb-2`}
        >
          <Link
            to="/dashboard"
            className={`${
              isOpen ? "w-full" : "w-8 h-8 md:w-10 md:h-10"
            } flex items-center ${
              isOpen ? "p-1.5 md:p-2" : "p-0 justify-center"
            } rounded-md text-blue-400 text-xs md:text-sm`}
          >
            <ImgIcon
              src={
                currentPath === "/dashboard" ? "key-blue.svg" : "key-gray.svg"
              }
            />
            {isOpen && <span className="ml-2 md:ml-3">Todas as Senhas</span>}
          </Link>
        </div>

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
          label="Favoritos"
          isOpen={isOpen}
          href="/favorites"
          isActive={currentPath === "/favorites"}
        />
        <SidebarItem
          icon={<ImgIcon src="history-gray.svg" />}
          label="Recentes"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<ImgIcon src="link-gray.svg" />}
          label="Meus Links"
          isOpen={isOpen}
        />
        <SidebarItem
          icon={<ImgIcon src="share-gray.svg" />}
          label="Senhas Compartilhadas"
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
          } my-2 md:my-3 border-t border-gray-700`}
        ></div>
      </div>

      <SidebarFooter isOpen={isOpen} />
    </nav>
  );
}
