"use client";

import Header from "renderer/components/header/header";
import { GridContent } from "renderer/components/ui/main-content/grid-content";
import { GridViewContent } from "renderer/components/ui/main-content/grid-view-content";
import { HeaderContent } from "renderer/components/ui/main-content/header-content";
import { ToasterContent } from "renderer/components/ui/main-content/toaster-content";

import CreateModal from "../../components/create-modal";
import ItemCard from "../../components/item-card";
import SettingsDrawer from "../../components/settings-drawer";
import Sidebar from "../../components/sidebar/sidebar";
import SortModal from "../../components/sort-modal";
import { setIconUrl } from "shared/utils/utils";
import { GridViewSkeleton } from "./components/grid-view-skeleton";
import { ItemsProps } from "../types";

export default function GridView(props: ItemsProps) {
  const renderPasswords = (items: any[] | undefined) => {
    if (props.isFetching) {
      return <GridViewSkeleton />;
    }

    return (
      <GridViewContent>
        {items?.map((item) => (
          <ItemCard
            type={item.type}
            iconUrl={setIconUrl(item.plaintext.url || "")}
            key={item.id}
            id={item.id}
            name={item.plaintext.name}
            description={item.plaintext.description}
            onDelete={props.handleDeletePassword}
          />
        ))}
      </GridViewContent>
    );
  };

  return (
    <div className="flex h-screen bg-[#000000] text-white">
      <Sidebar isOpen={props.isSidebarOpen} onToggle={props.toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden custom-scrollbar">
        <Header />
        <HeaderContent
          createButtonRef={props.createButtonRef}
          handleOpenCreateModal={props.handleOpenCreateModal}
          handleOpenSortModal={props.handleOpenSortModal}
          sortButtonRef={props.sortButtonRef}
          searchTerm={props.searchTerm}
          isSidebarOpen={props.isSidebarOpen}
          isGridView={props.isGridView}
          viewType={props.viewType}
          toggleSidebar={props.toggleSidebar}
          handleSearch={props.handleSearch}
          setIsGridView={props.setIsGridView}
          setIsSettingsDrawerOpen={props.setIsSettingsDrawerOpen}
          pageName={props.pageName}
        />

        <div className="flex-1 overflow-hidden custom-scrollbar">
          <GridContent
            filteredItems={props.filteredItems}
            groupedDatas={props.groupedPasswords}
            renderDatas={() => renderPasswords(props.items)}
            viewType={props.viewType}
          />
        </div>
      </div>

      <SortModal
        isOpen={props.isSortModalOpen}
        onClose={() => props.setIsSortModalOpen(false)}
        onViewChange={props.setViewType}
        currentView={props.viewType}
        position={props.isSortModalOpen ? props.modalPosition : undefined}
        isDesktop={props.isDesktop}
      />

      <CreateModal
        isOpen={props.isCreateModalOpen}
        onClose={() => props.setIsCreateModalOpen(false)}
        position={props.isCreateModalOpen ? props.modalPosition : undefined}
        isDesktop={props.isDesktop}
      />

      <SettingsDrawer
        isOpen={props.isSettingsDrawerOpen}
        onClose={() => props.setIsSettingsDrawerOpen(false)}
      />

      <ToasterContent position="top-right" theme="dark" />
    </div>
  );
}
