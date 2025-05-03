"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Settings,
  Bell,
  Grid,
  List,
  ArrowUpDown,
  Lock,
  Share2,
  Hash,
  Wrench,
  Plus,
} from "lucide-react";
import Sidebar from "../../components/sidebar/sidebar";
import PasswordCard from "../../components/password-card";
import SortModal from "../../components/sort-modal";
import CreateModal from "../../components/create-modal";
import SettingsDrawer from "../../components/settings-drawer";
import PasswordSection from "../../components/password-section";
import { generateMockPasswords } from "../../lib/mock-data";
import { Toaster } from "sonner";
import { usePlatform } from "../../hooks/use-platform";
import PasswordDetailsPanel from "../../components/password-details-panel";
import FloatingActionButton from "../../components/floating-action-button";
import { toast } from "sonner";
import PasswordCardSkeleton from "../../components/password-card-skeleton";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable";
import Header from "renderer/components/header";

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

  // Auto-close sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load initial data
  useEffect(() => {
    // Simulate loading data from backend
    setIsLoading(true);

    setTimeout(() => {
      const initialPasswords = generateMockPasswords(15);
      setPasswords(initialPasswords);
      setFilteredPasswords(initialPasswords);
      setIsLoading(false);
    }, 1500); // Simulate network delay
  }, []);

  // Filter passwords
  useEffect(() => {
    let result = [...passwords];

    // Filter by search term
    if (searchTerm) {
      result = result.filter((password) =>
        password.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPasswords(result);
  }, [searchTerm, passwords]);

  // Handle password deletion
  const handleDeletePassword = (id: string) => {
    // Remove from main passwords array
    setPasswords((prevPasswords) =>
      prevPasswords.filter((password) => password.id !== id)
    );
  };

  // Group passwords by type
  const groupedPasswords = {
    personal: filteredPasswords.filter((p) => !p.status),
    shared: filteredPasswords.filter((p) => p.status === "senha compartilhada"),
    social: filteredPasswords.filter((p) => p.status === "social network"),
    tools: filteredPasswords.filter(
      (p) => !p.status || p.status === "senha compartilhada"
    ),
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle opening create modal
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

  // Handle opening sort modal
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

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Add a function to handle card click
  const handleCardClick = (password: any) => {
    setSelectedPassword(password);
  };

  // Replace the renderPasswords function with this updated version
  const renderPasswords = (passwords: any[]) => {
    if (isLoading) {
      // Show skeletons while loading
      return isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-3 md:gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <PasswordCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <PasswordCardSkeleton key={index} listView={true} />
          ))}
        </div>
      );
    }

    if (passwords.length === 0) {
      return (
        <div className="text-gray-400 text-center py-4">
          Nenhuma senha encontrada
        </div>
      );
    }

    if (isGridView) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-3 md:gap-4">
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
        </div>
      );
    }

    return (
      <div className="flex flex-col space-y-2">
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
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#000000] text-white">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        activePage="dashboard"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden custom-scrollbar">
        {/* Top Navigation */}
        <Header />
        <div className="flex items-center justify-between p-2 md:p-3 border-b border-[#000000] bg-[#141414]">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="hover:bg-gray-700 p-1 rounded-md"
            >
              <img
                src={
                  isSidebarOpen ? "/svg/menu-open.svg" : "/svg/menu-closed.svg"
                }
                alt=""
                className="w-6 h-6 cursor-pointer"
              />
            </button>
            <span className="text-[#626262] text-sm md:text-base">
              Menu / Todas as Senhas
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl mx-2 md:mx-4">
            <div className="relative flex items-center bg-[#2a2a2a] rounded-md">
              <Search className="absolute left-2 md:left-3 h-4 md:h-5 w-4 md:w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar"
                className="w-full py-1 md:py-1.5 pl-8 md:pl-10 pr-2 md:pr-4 text-sm md:text-base bg-transparent focus:outline-none"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="absolute right-2 hidden md:block">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-gray-400 fill-current"
                >
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Only show the create button in list view */}
            {!isGridView && (
              <button
                ref={createButtonRef}
                className="p-1 md:p-1.5 rounded-md hover:bg-gray-700 text-blue-400"
                onClick={handleOpenCreateModal}
                title="Criar novo"
              >
                <Plus className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            )}
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
            <button
              className="p-1 md:p-1.5 rounded-md hover:bg-gray-700"
              onClick={() => setIsGridView(!isGridView)}
            >
              {isGridView ? (
                <List className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
              ) : (
                <Grid className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
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

        {/* Password Grid/List with Split View */}
        <div className="flex-1 overflow-hidden custom-scrollbar">
          {isGridView ? (
            // Grid view - full width
            <div className="h-full overflow-y-auto custom-scrollbar p-2 md:p-4 3xl:p-6">
              {viewType === "all" ? (
                // Show all passwords
                <div>{renderPasswords(filteredPasswords)}</div>
              ) : (
                // Show passwords grouped by type
                <div>
                  <PasswordSection
                    title="Senhas Pessoais"
                    icon={<Lock className="h-4 md:h-5 w-4 md:w-5" />}
                  >
                    {renderPasswords(groupedPasswords.personal)}
                  </PasswordSection>

                  <PasswordSection
                    title="Senhas Compartilhadas"
                    icon={<Share2 className="h-4 md:h-5 w-4 md:w-5" />}
                  >
                    {renderPasswords(groupedPasswords.shared)}
                  </PasswordSection>

                  <PasswordSection
                    title="Mídias Sociais"
                    icon={<Hash className="h-4 md:h-5 w-4 md:w-5" />}
                  >
                    {renderPasswords(groupedPasswords.social)}
                  </PasswordSection>

                  <PasswordSection
                    title="Ferramentas"
                    icon={<Wrench className="h-4 md:h-5 w-4 md:w-5" />}
                    isLast={true}
                  >
                    {renderPasswords(groupedPasswords.tools)}
                  </PasswordSection>
                </div>
              )}
            </div>
          ) : (
            // List view with resizable panels
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Left panel - Password list */}
              <ResizablePanel
                defaultSize={50}
                minSize={30}
                className="overflow-y-auto custom-scrollbar"
              >
                <div className="p-2 md:p-4 3xl:p-6">
                  {viewType === "all" ? (
                    // Show all passwords
                    <div>{renderPasswords(filteredPasswords)}</div>
                  ) : (
                    // Show passwords grouped by type
                    <div>
                      <PasswordSection
                        title="Senhas Pessoais"
                        icon={<Lock className="h-4 md:h-5 w-4 md:w-5" />}
                      >
                        {renderPasswords(groupedPasswords.personal)}
                      </PasswordSection>

                      <PasswordSection
                        title="Senhas Compartilhadas"
                        icon={<Share2 className="h-4 md:h-5 w-4 md:w-5" />}
                      >
                        {renderPasswords(groupedPasswords.shared)}
                      </PasswordSection>

                      <PasswordSection
                        title="Mídias Sociais"
                        icon={<Hash className="h-4 md:h-5 w-4 md:w-5" />}
                      >
                        {renderPasswords(groupedPasswords.social)}
                      </PasswordSection>

                      <PasswordSection
                        title="Ferramentas"
                        icon={<Wrench className="h-4 md:h-5 w-4 md:w-5" />}
                        isLast={true}
                      >
                        {renderPasswords(groupedPasswords.tools)}
                      </PasswordSection>
                    </div>
                  )}
                </div>
              </ResizablePanel>

              {/* Resizable handle */}
              <ResizableHandle withHandle className="bg-gray-800" />

              {/* Right panel - Password details */}
              <ResizablePanel
                defaultSize={50}
                minSize={30}
                className="bg-[#1a1a1a] overflow-y-auto custom-scrollbar"
              >
                <PasswordDetailsPanel
                  selectedPassword={selectedPassword}
                  isLoading={isLoading && selectedPassword === null}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          )}
        </div>
      </div>

      {/* Sort Modal */}
      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        onViewChange={setViewType}
        currentView={viewType}
        position={isSortModalOpen ? modalPosition : undefined}
        isDesktop={isDesktop}
      />

      {/* Create Modal */}
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        position={isCreateModalOpen ? modalPosition : undefined}
        isDesktop={isDesktop}
      />

      {/* Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsDrawerOpen}
        onClose={() => setIsSettingsDrawerOpen(false)}
      />

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        closeButton
        richColors
        theme="dark"
        toastOptions={{
          className: "slide-in-from-right",
          duration: 4000,
        }}
      />

      {/* Floating Action Button - only visible in grid view */}
      {isGridView && (
        <FloatingActionButton
          onCreatePassword={handleOpenCreateModal}
          onCreateCommand={() => toast.info("Criar novo comando")}
          onCreateFavorite={() => toast.info("Criar novo favorito")}
          onCreateLink={() => toast.info("Criar novo link")}
          onCreateShared={() => toast.info("Criar senha compartilhada")}
        />
      )}
    </div>
  );
}
