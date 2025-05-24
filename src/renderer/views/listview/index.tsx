"use client";

import Header from "renderer/components/header/header";
import { HeaderContent } from "renderer/components/ui/main-content/header-content";
import { ToasterContent } from "renderer/components/ui/main-content/toaster-content";

import CreateModal from "../../components/create-modal";
import SettingsDrawer from "../../components/settings-drawer";
import Sidebar from "../../components/sidebar/sidebar";
import SortModal from "../../components/sort-modal";
import { ItemsProps } from "../utils/types";
import { ListViewRender } from "./components/list-view-render";
import { ListContentResizable } from "./components/list-content-resizable";

export default function ListView(props: ItemsProps) {
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
          <ListContentResizable
            filteredDatas={props.filteredItems}
            groupedDatas={props.groupedItems}
            isLoading={props.isFetching}
            viewType={props.viewType}
            selectedData={props.selectedPassword}
            isGridView={props.isGridView}
            children={
              <ListViewRender
                handleCardClick={props.handleCardClick}
                handleDeleteItem={props.handleDeleteItem}
                isFetching={props.isFetching}
                items={props.items || []}
              />
            }
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
