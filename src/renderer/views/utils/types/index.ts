import { Item } from "../interfaces";

export type ItemsProps = {
  items?: any[];
  isDesktop: boolean;
  isFetching: boolean;
  isSidebarOpen: boolean;
  searchTerm: string;
  isSortModalOpen: boolean;
  isCreateModalOpen: boolean;
  isSettingsDrawerOpen: boolean;
  filteredItems: any[];
  viewType: "all" | "type";
  isGridView: boolean;
  selectedItem: any | null;
  modalPosition: { top: number; left: number; right: number } | undefined;
  createButtonRef: React.RefObject<HTMLButtonElement | null>;
  sortButtonRef: React.RefObject<HTMLButtonElement | null>;
  pageName: string;
  groupedItems: {
    personal: any[];
    shared: any[];
    social: any[];
    tools: any[];
  };
  setIsCreateModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSortModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGridView: React.Dispatch<React.SetStateAction<boolean>>;
  handleOpenSortModal: () => void;
  handleOpenCreateModal: () => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setViewType: (viewType: "all" | "type") => void;
  setIsSettingsDrawerOpen: (isSettingsDrawerOpen: boolean) => void;
  handleCardClick: (item: any) => void;
  toggleSidebar: () => void;
  handleDeleteItem: (itemId: string) => void;
};

export type ItemViewRenderProps = {
  items: Item[];
  isFetching: boolean;
  handleCardClick: (item: any) => void;
  handleDeleteItem: (itemId: string) => void;
};
