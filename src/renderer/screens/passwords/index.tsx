"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

import GridView from "renderer/views/gridview";
import ListView from "renderer/views/listview";

import { useQuery } from "@tanstack/react-query";

import { usePlatform } from "../../hooks/use-platform";

export default function PasswordsScreen() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isGridView, setIsGridView] = useState(false);
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

  // useEffect(() => {
  //   let result = [...passwords];

  //   if (searchTerm) {
  //     result = result.filter((password) =>
  //       items.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //   }

  //   setFilteredPasswords(result);
  // }, [searchTerm, passwords]);

  const handleDeletePassword = (id: string) => {
    // setPasswords((prevPasswords) =>
    //   prevPasswords.filter((password) => items.id !== id)
    // );
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

  const { data, isFetching } = useQuery({
    queryKey: ["passwords"],
    queryFn: async () => await window.dataApi.fetchPasswords(),
  });

  if (isGridView) {
    return (
      <GridView
        setSelectedPassword={setSelectedPassword}
        isFetching={isFetching}
        items={data?.data}
        createButtonRef={createButtonRef}
        filteredItems={filteredPasswords}
        groupedItems={groupedPasswords}
        handleCardClick={handleCardClick}
        handleDeleteItem={handleDeletePassword}
        handleOpenCreateModal={handleOpenCreateModal}
        handleOpenSortModal={handleOpenSortModal}
        handleSearch={handleSearch}
        isCreateModalOpen={isCreateModalOpen}
        isDesktop={isDesktop}
        isGridView={isGridView}
        isSettingsDrawerOpen={isSettingsDrawerOpen}
        isSidebarOpen={isSidebarOpen}
        isSortModalOpen={isSortModalOpen}
        modalPosition={modalPosition}
        searchTerm={searchTerm}
        selectedItem={selectedPassword}
        setIsCreateModalOpen={setIsCreateModalOpen}
        setIsGridView={setIsGridView}
        setIsSettingsDrawerOpen={setIsSettingsDrawerOpen}
        setIsSortModalOpen={setIsSortModalOpen}
        setViewType={setViewType}
        sortButtonRef={sortButtonRef}
        toggleSidebar={toggleSidebar}
        viewType={viewType}
        pageName="Senhas de Acesso"
      />
    );
  }

  return (
    <ListView
      setSelectedPassword={setSelectedPassword}
      isFetching={isFetching}
      items={data?.data}
      createButtonRef={createButtonRef}
      filteredItems={filteredPasswords}
      groupedItems={groupedPasswords}
      handleCardClick={handleCardClick}
      handleDeleteItem={handleDeletePassword}
      handleOpenCreateModal={handleOpenCreateModal}
      handleOpenSortModal={handleOpenSortModal}
      handleSearch={handleSearch}
      isCreateModalOpen={isCreateModalOpen}
      isDesktop={isDesktop}
      isGridView={isGridView}
      isSettingsDrawerOpen={isSettingsDrawerOpen}
      isSidebarOpen={isSidebarOpen}
      isSortModalOpen={isSortModalOpen}
      modalPosition={modalPosition}
      searchTerm={searchTerm}
      selectedItem={selectedPassword}
      setIsCreateModalOpen={setIsCreateModalOpen}
      setIsGridView={setIsGridView}
      setIsSettingsDrawerOpen={setIsSettingsDrawerOpen}
      setIsSortModalOpen={setIsSortModalOpen}
      setViewType={setViewType}
      sortButtonRef={sortButtonRef}
      toggleSidebar={toggleSidebar}
      viewType={viewType}
      pageName="Senhas de Acesso"
    />
  );
}
