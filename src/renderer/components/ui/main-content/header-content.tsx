"use client";

import type React from "react";

import { Bell, Grid, List, Plus, Search, Settings } from "lucide-react";
import HorizontalDivider from "renderer/components/horizontal-divider";
import { useLocation } from "react-router-dom";

export function HeaderContent({
  pageName,
  searchTerm,
  isSidebarOpen,
  isGridView,
  viewType,
  createButtonRef,
  sortButtonRef,
  toggleSidebar,
  handleSearch,
  handleOpenCreateModal,
  handleOpenSortModal,
  setIsGridView,
  setIsSettingsDrawerOpen,
}: {
  pageName: string;
  searchTerm: string;
  isSidebarOpen: boolean;
  isGridView: boolean;
  viewType: "type" | "all";
  createButtonRef: React.RefObject<HTMLButtonElement | null>;
  sortButtonRef: React.RefObject<HTMLButtonElement | null>;
  toggleSidebar: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenCreateModal: () => void;
  handleOpenSortModal: () => void;
  setIsGridView: (isGridView: boolean) => void;
  setIsSettingsDrawerOpen: (isOpen: boolean) => void;
}) {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <div className="flex items-center border-l-2 justify-between p-2 md:p-3 border-b border-[#000000] bg-[#141414]">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="hover:bg-gray-700 p-1 rounded-md"
        >
          <img
            src={isSidebarOpen ? "/svg/menu-open.svg" : "/svg/menu-closed.svg"}
            alt=""
            className="w-6 h-6 cursor-pointer"
          />
        </button>
        <HorizontalDivider borderColor="border-[#626262]" height="h-6" />
        <span className="text-[#626262] text-sm md:text-base">
          Menu /&nbsp;
        </span>
        <span className="text-[#B8B8B8] text-sm md:text-base">{pageName}</span>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <div className="relative flex-1 max-w-xl mx-2 md:mx-4">
          <div className="relative flex items-center bg-transparent rounded-md">
            <Search className="absolute left-2 md:left-3 h-4 md:h-5 w-4 md:w-5 text-[#7A7A7A]" />
            <input
              type="text"
              placeholder="Pesquisar"
              className="w-80 py-1 md:py-1.5 pl-8 md:pl-10 pr-2 md:pr-4 text-sm md:text-base bg-[#141414] border-1 border-[#7A7A7A] rounded-md focus:outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="absolute right-2 hidden md:block">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 text-[#7A7A7A] fill-current"
              >
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </button>
          </div>
        </div>
        <button
          ref={createButtonRef}
          className="p-1 md:p-1.5 rounded-md hover:bg-gray-700 text-blue-400"
          onClick={handleOpenCreateModal}
          title="Criar novo"
        >
          <Plus className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        {currentPath === "dashboard" && (
          <button
            ref={sortButtonRef}
            className={`p-1 md:p-1.5 rounded-md hover:bg-gray-700 ${
              viewType === "type" ? "bg-gray-700" : ""
            }`}
            onClick={handleOpenSortModal}
            title="Ordenar itens"
          >
            <img src="/svg/order-gray.svg" alt="" className="w-6 h-6" />
          </button>
        )}
        <button
          className="p-1 md:p-1.5 rounded-md hover:bg-gray-700"
          onClick={() => setIsGridView(!isGridView)}
        >
          {isGridView ? (
            <Grid className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          ) : (
            <List className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          )}
        </button>
        <button
          className="p-1 md:p-1.5 rounded-md hover:bg-gray-700 text-blue-400"
          onClick={() => setIsSettingsDrawerOpen(true)}
          title="Configurações"
        >
          <Settings className="h-4 w-4 md:h-5 md:w-5" />
        </button>
        <button className="p-1 md:p-1.5 rounded-md hover:bg-gray-700">
          <Bell className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}
