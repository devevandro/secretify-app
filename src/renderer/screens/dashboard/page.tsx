"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

import Header from "renderer/components/header/header";
import { GridContent } from "renderer/components/ui/main-content/grid-content";
import { HeaderContent } from "renderer/components/ui/main-content/header-content";
import { ListContentResizable } from "renderer/components/ui/main-content/list-content-resizable";
import { Toaster } from "sonner";

import CreateModal from "../../components/create-modal";
import PasswordCard from "../../components/password-card";
import PasswordCardSkeleton from "../../components/password-card-skeleton";
import SettingsDrawer from "../../components/settings-drawer";
import Sidebar from "../../components/sidebar/sidebar";
import SortModal from "../../components/sort-modal";
import { usePlatform } from "../../hooks/use-platform";
import { generateMockPasswords } from "../../lib/mock-data";
import { NoItem } from "renderer/components/no-item";
import { GridViewContent } from "renderer/components/ui/main-content/grid-view-content";
import { ListViewContent } from "renderer/components/ui/main-content/list-view-content";
import { SkeletonContent } from "renderer/components/ui/main-content/skeleton-content";
import { ToasterContent } from "renderer/components/ui/main-content/toaster-content";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isGridView, setIsGridView] = useState(true);
  const [passwords, setPasswords] = useState<any[]>([]);
  const [filteredPasswords, setFilteredPasswords] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);
  const [viewType, setViewType] = useState<"all" | "type">("all");
  const [modalPosition, setModalPosition] = useState<
    { top: number; left: number; right: number } | undefined
  >();
  const [selectedPassword, setSelectedPassword] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const createButtonRef = useRef<HTMLButtonElement>(null);
  const sortButtonRef = useRef<HTMLButtonElement>(null);

  const { isDesktop } = usePlatform();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      const initialPasswords = generateMockPasswords(15);
      setPasswords(initialPasswords);
      setFilteredPasswords(initialPasswords);
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    let result = [...passwords];

    if (searchTerm) {
      result = result.filter((password) =>
        password.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPasswords(result);
  }, [searchTerm, passwords]);

  const handleDeletePassword = (id: string) => {
    setPasswords((prevPasswords) =>
      prevPasswords.filter((password) => password.id !== id)
    );
  };

  const groupedPasswords = {
    personal: filteredPasswords.filter((p) => !p.status),
    shared: filteredPasswords.filter((p) => p.status === "senha compartilhada"),
    social: filteredPasswords.filter((p) => p.status === "social network"),
    tools: filteredPasswords.filter(
      (p) => !p.status || p.status === "senha compartilhada"
    ),
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleOpenCreateModal = () => {
    if (isDesktop && createButtonRef.current) {
      const rect = createButtonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + 5,
        left: rect.left,
        right: window.innerWidth - rect.right,
      });
    }
    setIsCreateModalOpen(true);
  };

  const handleOpenSortModal = () => {
    if (isDesktop && sortButtonRef.current) {
      const rect = sortButtonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + 5,
        left: rect.left,
        right: window.innerWidth - rect.right,
      });
    }
    setIsSortModalOpen(true);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCardClick = (password: any) => {
    setSelectedPassword(password);
  };

  const renderPasswords = (passwords: any[]) => {
    if (isLoading) {
      return <SkeletonContent isGridView={isGridView} />;
    }

    if (passwords.length === 0) {
      return (
        <NoItem
          title="Nenhum Item Criado!"
          subtitle="Bora começar a criar um item?"
          isGridView={true}
        />
      );
    }

    if (isGridView) {
      return (
        <GridViewContent>
          {passwords.map((password) => (
            <PasswordCard
              key={password.id}
              id={password.id}
              icon={password.icon}
              iconUrl={password.iconUrl}
              name={password.name}
              user={password.user}
              status={password.status}
              color={password.color}
              onDelete={handleDeletePassword}
            />
          ))}
        </GridViewContent>
      );
    }

    return (
      <ListViewContent>
        {passwords.map((password) => (
          <PasswordCard
            key={password.id}
            id={password.id}
            icon={password.icon}
            iconUrl={password.iconUrl}
            name={password.name}
            user={password.user}
            status={password.status}
            color={password.color}
            listView={true}
            onDelete={handleDeletePassword}
            onClick={() => handleCardClick(password)}
          />
        ))}
      </ListViewContent>
    );
  };

  return (
    <div className="flex h-screen bg-[#000000] text-white">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        activePage="dashboard"
      />

      <div className="flex-1 flex flex-col overflow-hidden custom-scrollbar">
        <Header />
        <HeaderContent
          createButtonRef={createButtonRef}
          handleOpenCreateModal={handleOpenCreateModal}
          handleOpenSortModal={handleOpenSortModal}
          sortButtonRef={sortButtonRef}
          searchTerm={searchTerm}
          isSidebarOpen={isSidebarOpen}
          isGridView={isGridView}
          viewType={viewType}
          toggleSidebar={toggleSidebar}
          handleSearch={handleSearch}
          setIsGridView={setIsGridView}
          setIsSettingsDrawerOpen={setIsSettingsDrawerOpen}
          pageName="Início"
        />

        <div className="flex-1 overflow-hidden custom-scrollbar">
          {isGridView ? (
            <GridContent
              filteredDatas={filteredPasswords}
              groupedDatas={groupedPasswords}
              renderDatas={renderPasswords}
              viewType={viewType}
            />
          ) : (
            <ListContentResizable
              filteredDatas={filteredPasswords}
              groupedDatas={groupedPasswords}
              isLoading={isLoading}
              viewType={viewType}
              selectedData={selectedPassword}
              renderDatas={renderPasswords}
            />
          )}
        </div>
      </div>

      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onViewChange={setViewType}
        currentView={viewType}
        position={isSortModalOpen ? modalPosition : undefined}
        isDesktop={isDesktop}
      />

      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        position={isCreateModalOpen ? modalPosition : undefined}
        isDesktop={isDesktop}
      />

      <SettingsDrawer
        isOpen={isSettingsDrawerOpen}
        onClose={() => setIsSettingsDrawerOpen(false)}
      />

      <ToasterContent position="top-right" theme="dark" />
    </div>
  );
}
