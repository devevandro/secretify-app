"use client";

import { useEffect, useRef, useState } from "react";

import Header from "../header/header";
import { SidebarLogo } from "../ui/sidebar/sidebar-logo";
import { SidebarNavigation } from "../ui/sidebar/sidebar-navigation";
import { SidebarProfile } from "../ui/sidebar/sidebar-profile";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activePage?: string;
}

export default function Sidebar({
  isOpen,
  activePage = "dashboard",
}: SidebarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profileMenuRef.current) {
      if (isProfileOpen) {
        profileMenuRef.current.style.maxHeight = `${profileMenuRef.current.scrollHeight}px`;
      } else {
        profileMenuRef.current.style.maxHeight = "0";
      }
    }
  }, [isProfileOpen]);

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
      } bg-[#141414] border-r-2 border-[#000000] flex flex-col transition-all duration-300 overflow-hidden custom-scrollbar h-screen`}
    >
      <Header />
      <SidebarLogo isOpen={isOpen} />
      <SidebarProfile
        handleHideProfile={handleHideProfile}
        isOpen={isOpen}
        isProfileOpen={isProfileOpen}
        isProfileVisible={isProfileVisible}
        profileMenuRef={profileMenuRef}
        setIsProfileOpen={setIsProfileOpen}
      />
      <SidebarNavigation
        handleShowProfile={handleShowProfile}
        isOpen={isOpen}
        isProfileVisible={isProfileVisible}
      />
    </div>
  );
}
