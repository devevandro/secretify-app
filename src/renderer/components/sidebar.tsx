"use client";

import type React from "react";

import { Link } from "react-router-dom";
import {
  Star,
  Clock,
  LinkIcon,
  Share2,
  Terminal,
  Shield,
  Trash2,
  ChevronDown,
  User,
  Bell,
  Settings,
  LogOut,
  Eye,
  Lock,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Header from "./header";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activePage?: string;
}

export default function Sidebar({
  isOpen,
  onToggle,
  activePage = "dashboard",
}: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Calculate height for animation
  useEffect(() => {
    if (profileMenuRef.current) {
      if (isProfileOpen) {
        profileMenuRef.current.style.maxHeight = `${profileMenuRef.current.scrollHeight}px`;
      } else {
        profileMenuRef.current.style.maxHeight = "0";
      }
    }
  }, [isProfileOpen]);

  // Handle hide/show profile
  const handleHideProfile = () => {
    setIsProfileVisible(false);
    setIsProfileOpen(false);
  };

  const handleShowProfile = () => {
    setIsProfileVisible(true);
  };

  return (
    <div
      className={`${
        isOpen ? "w-56 md:w-64 lg:w-72" : "w-0 md:w-16"
      } bg-[#1e1e1e] border-r border-gray-800 flex flex-col transition-all duration-300 overflow-hidden h-screen`}
    >
      {/* Logo */}
      <Header />
      <div className="p-3 md:p-4 flex items-center">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
          <span className="text-white text-base md:text-xl font-bold">S</span>
        </div>
        {isOpen && (
          <span className="text-[#58beee] text-lg md:text-2xl font-bold">
            Secretfy
          </span>
        )}
      </div>

      {/* User Profile with Background - Only show when sidebar is open and profile is visible */}
      {isOpen && isProfileVisible && (
        <div className="relative">
          <div className="relative p-3 md:p-4 flex items-center">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-700 opacity-30"></div>
            {/* <img
              src="/public/placeholder.svg?height=100&width=300"
              alt="Background"
              className="object-cover opacity-20"
            /> */}
            <div className="relative z-10 flex items-center w-full">
              <div className="relative w-8 h-8 md:w-12 md:h-12 mr-2 md:mr-3">
                <img
                  src="https://cdn.pixabay.com/photo/2020/10/26/16/31/naruto-5687811_1280.png"
                  alt="User Profile"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm md:text-base">InnovaDev</h3>
                <p className="text-xs md:text-sm text-gray-400">@innovaredev</p>
              </div>
              <button
                className="ml-auto text-gray-400"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <ChevronDown
                  className={`h-4 w-4 md:h-5 md:w-5 transform transition-transform duration-300 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Profile Dropdown - Collapsible with smooth animation */}
          <div
            ref={profileMenuRef}
            className="overflow-hidden transition-all duration-300 ease-in-out bg-[#2a2a2a] border-t border-gray-800"
            style={{ maxHeight: 0 }}
          >
            <div className="py-1 md:py-2">
              <button
                className="w-full flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-400 hover:bg-gray-800"
                onClick={handleHideProfile}
              >
                <Eye className="h-3 w-3 md:h-4 md:w-4 mr-2 md:mr-3" />
                Esconder Perfil
              </button>
              <button className="w-full flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-400 hover:bg-gray-800">
                <User className="h-3 w-3 md:h-4 md:w-4 mr-2 md:mr-3" />
                Perfil
              </button>
              <button className="w-full flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-400 hover:bg-gray-800">
                <Bell className="h-3 w-3 md:h-4 md:w-4 mr-2 md:mr-3" />
                Notificações
              </button>
              <button className="w-full flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-400 hover:bg-gray-800">
                <Settings className="h-3 w-3 md:h-4 md:w-4 mr-2 md:mr-3" />
                Configurações
              </button>
              <div className="my-1 md:my-2 border-t border-gray-700"></div>
              <button className="w-full flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-400 hover:bg-gray-800">
                <LogOut className="h-3 w-3 md:h-4 md:w-4 mr-2 md:mr-3" />
                Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compact user profile when sidebar is collapsed */}
      {!isOpen && isProfileVisible && (
        <div className="hidden md:flex justify-center py-3 md:py-4">
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <img
              src="https://cdn.pixabay.com/photo/2020/10/26/16/31/naruto-5687811_1280.png"
              alt="User Profile"
              width={40}
              height={40}
              className="rounded-full"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 flex flex-col mt-2 md:mt-4 overflow-y-auto">
        <div className="flex-1">
          {/* Show Profile button when profile is hidden */}
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
              } bg-blue-900 bg-opacity-30 rounded-md text-blue-400 text-xs md:text-sm`}
            >
              <Lock className="h-4 w-4 md:h-5 md:w-5 min-w-4 md:min-w-5" />
              {isOpen && <span className="ml-2 md:ml-3">Todas às Senhas</span>}
            </Link>
          </div>

          <SidebarItem
            icon={<Star className="h-4 w-4 md:h-5 md:w-5" />}
            label="Favoritos"
            isOpen={isOpen}
            href="/favorites"
            isActive={activePage === "favorites"}
          />
          <SidebarItem
            icon={<Clock className="h-4 w-4 md:h-5 md:w-5" />}
            label="Recentes"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<LinkIcon className="h-4 w-4 md:h-5 md:w-5" />}
            label="Meus Links"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<Share2 className="h-4 w-4 md:h-5 md:w-5" />}
            label="Senhas Compartilhadas"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<Terminal className="h-4 w-4 md:h-5 md:w-5" />}
            label="Comandos"
            isOpen={isOpen}
          />

          {/* Divider after Comandos */}
          <div
            className={`${
              isOpen ? "mx-3" : "mx-auto w-6 md:w-8"
            } my-2 md:my-3 border-t border-gray-700`}
          ></div>
        </div>

        {/* Footer navigation with divider */}
        <div className="mt-auto mb-3 md:mb-4">
          <div
            className={`${
              isOpen ? "mx-3" : "mx-auto w-6 md:w-8"
            } my-2 md:my-3 border-t border-gray-700`}
          ></div>
          <SidebarItem
            icon={<Shield className="h-4 w-4 md:h-5 md:w-5" />}
            label="Relatórios de Segurança"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<Trash2 className="h-4 w-4 md:h-5 md:w-5" />}
            label="Lixeira"
            isOpen={isOpen}
            href="/trash"
          />
        </div>
      </nav>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  isOpen,
  href = "#",
  isActive = false,
}: {
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  href?: string;
  isActive?: boolean;
}) {
  return (
    <div
      className={`${
        isOpen ? "px-2 md:px-3" : "px-0 flex justify-center"
      } mb-0.5 md:mb-1`}
    >
      <Link
        to={href}
        className={`${
          isOpen
            ? "w-full justify-start"
            : "w-8 h-8 md:w-10 md:h-10 justify-center"
        } flex items-center ${
          isOpen ? "p-1.5 md:p-2" : "p-0"
        } hover:bg-gray-800 rounded-md ${
          isActive ? "text-[#6fbbdb] bg-[#2a4b5c]" : "text-[#626262]"
        } hover:text-gray-200 text-xs md:text-sm`}
      >
        <span className={isOpen ? "mr-2 md:mr-3" : ""}>{icon}</span>
        {isOpen && label}
      </Link>
    </div>
  );
}
