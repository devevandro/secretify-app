"use client";

import { ChevronDown, User, Bell, Settings, LogOut, Eye } from "lucide-react";
import { SidebarProfileItem } from "./sidebar-profile-item";
import { useNavigate } from "react-router-dom";

export function SidebarProfile({
  isOpen,
  isProfileVisible,
  isProfileOpen,
  profileMenuRef,
  handleHideProfile,
  setIsProfileOpen,
}: {
  isOpen: boolean;
  isProfileVisible: boolean;
  isProfileOpen: boolean;
  profileMenuRef: React.RefObject<HTMLDivElement | null>;
  setIsProfileOpen: (value: boolean) => void;
  handleHideProfile: () => void;
}) {
  const navigate = useNavigate();
  return (
    <>
      {isOpen && isProfileVisible && (
        <div className="relative">
          <div className="relative p-3 md:p-6 flex items-center">
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-[url('/img/profile-bg.png')] bg-no-repeat bg-cover opacity-50"></div>
            </div>
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
                <h3 className="font-medium text-sm md:text-base">
                  dev.evandro
                </h3>
                <p className="text-xs md:text-sm text-gray-400">
                  dev.evandro@gmail.com
                </p>
              </div>
              <button
                className="ml-auto text-gray-400 cursor-pointer"
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

          <div
            ref={profileMenuRef}
            className="overflow-hidden custom-scrollbar transition-all duration-300 ease-in-out bg-[#141414] border-t border-gray-800"
            style={{ maxHeight: 0 }}
          >
            <button
              className="w-full flex items-center px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-gray-400 hover:bg-gray-800"
              onClick={handleHideProfile}
            >
              <Eye className="h-3 w-3 md:h-4 md:w-4 mr-2 md:mr-3" />
              Esconder Perfil
            </button>
            <SidebarProfileItem
              label="Perfil"
              icon={<User className="h-3 w-3 md:h-4 md:w-4 mr-2 md:mr-3" />}
            />
            <SidebarProfileItem
              label="Notificações"
              icon={<Bell className="h-3 w-3 md:h-4 md:w-4 mr-2 md:mr-3" />}
            />
            <SidebarProfileItem
              label="Configurações"
              icon={<Settings className="h-3 w-3 md:h-4 md:w-4 mr-2 md:mr-3" />}
            />
            <div
              className={`${
                isOpen ? "mx-3" : "mx-auto w-6 md:w-8"
              } my-2 md:my-3 border-t border-[#292929]`}
            ></div>
            <SidebarProfileItem
              label="Sair"
              icon={<LogOut className="h-3 w-3 md:h-4 md:w-4 mr-2 md:mr-3" />}
              onClick={() => navigate("/")}
            />
            <div
              className={`${
                isOpen ? "mx-3" : "mx-auto w-6 md:w-8"
              } my-2 md:my-3 border-t border-[#292929]`}
            ></div>
          </div>
        </div>
      )}

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
    </>
  );
}
