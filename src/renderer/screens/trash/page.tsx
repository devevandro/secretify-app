"use client";

import type React from "react";

import { useState, useEffect } from "react";

import {
  Search,
  Settings,
  Bell,
  Grid,
  List,
  ArrowUpDown,
  MoreVertical,
} from "lucide-react";
import Sidebar from "../../components/sidebar/sidebar";
import Header from "renderer/components/header/header";

interface TrashItem {
  id: string;
  name: string;
  iconUrl: string;
  type: string;
  isShared?: boolean;
  description?: string;
  color?: string;
  user?: string;
  status?: string;
}

export default function TrashPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isGridView, setIsGridView] = useState(true);
  const [trashItems, setTrashItems] = useState<TrashItem[]>([
    {
      id: "1",
      name: "Nodejs",
      iconUrl: "https://cdn-icons-png.flaticon.com/512/5968/5968322.png",
      type: "senha privada",
      color: "bg-green-600",
      status: "senha compartilhada",
    },
    {
      id: "2",
      name: "Skype",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/85/Skype_logo_icon.png",
      type: "senha privada",
      color: "bg-blue-500",
      status: "senha privada",
    },
    {
      id: "3",
      name: "Dropbox",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg",
      type: "senha privada",
      color: "bg-blue-600",
      status: "senha privada",
    },
    {
      id: "4",
      name: "Netflix",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      type: "senha compartilhada",
      isShared: true,
      color: "bg-red-600",
      status: "senha compartilhada",
    },
    {
      id: "5",
      name: "Weibo",
      iconUrl: "https://upload.wikimedia.org/wikipedia/en/6/6a/Sina_Weibo.png",
      type: "senha privada",
      color: "bg-red-500",
      status: "senha privada",
    },
    {
      id: "6",
      name: "Flickr",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/9/9f/Flickr_logo.png",
      type: "senha compartilhada",
      isShared: true,
      color: "bg-blue-500",
      status: "senha compartilhada",
    },
    {
      id: "7",
      name: "Evernote",
      iconUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/7a/Evernote_Icon.png",
      type: "senha privada",
      color: "bg-green-500",
      status: "senha privada",
    },
    {
      id: "8",
      name: "Tik Tok",
      iconUrl: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
      type: "senha privada",
      color: "bg-black",
      status: "senha privada",
    },
    {
      id: "9",
      name: "Dom Famia",
      iconUrl: "/placeholder.svg?height=60&width=60&text=📁",
      type: "famia (dom-toretto)",
      description: "famia (dom-toretto)",
      color: "bg-blue-500",
      status: "famia (dom-toretto)",
    },
  ]);

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

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle checkbox selection
  const handleSelectItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  // Handle empty trash
  const handleEmptyTrash = () => {
    setTrashItems([]);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#1e1e1e] text-white overflow-hidden custom-scrollbar">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <Header />
        <div className="flex items-center justify-between p-2 md:p-3 border-b border-gray-800">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="hover:bg-gray-700 p-1 rounded-md"
            >
              <svg
                className="h-5 w-5 mr-2 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4V9H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 14V19H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 4V9H15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20 14V19H15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="text-[#626262] text-sm md:text-base">
              Menu / Lixeira
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-xl mx-2 md:mx-4">
            <div className="relative flex items-center bg-[#2a2a2a] rounded-md">
              <Search className="absolute left-2 md:left-3 h-4 md:h-5 w-4 md:w-5 text-gray-400" />
              <input
                type="text"
                placeholder="pesquisar"
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
            <button className="p-1 md:p-1.5 rounded-md hover:bg-gray-700">
              <ArrowUpDown className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            </button>
            <button className="p-1 md:p-1.5 rounded-md hover:bg-gray-700">
              <Settings className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            </button>
            <button className="p-1 md:p-1.5 rounded-md hover:bg-gray-700">
              <Bell className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Trash Content */}
        <div className="flex-1 overflow-y-auto p-2 md:p-4">
          {/* Trash Notice */}
          <div className="flex items-center justify-between bg-[#1a1a1a] p-3 md:p-4 rounded-md mb-4 custom-scrollbar">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 mr-3"
                onChange={() => {
                  if (selectedItems.length === trashItems.length) {
                    setSelectedItems([]);
                  } else {
                    setSelectedItems(trashItems.map((item) => item.id));
                  }
                }}
                checked={
                  selectedItems.length === trashItems.length &&
                  trashItems.length > 0
                }
              />
              <p className="text-sm text-gray-300">
                Os itens que permanecerem na lixeira por mais de 15 dias, serão
                excluídos automaticamente.{" "}
                <button
                  className="text-[#3b9bff] hover:underline"
                  onClick={handleEmptyTrash}
                >
                  esvaziar lixeira
                </button>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-gray-400 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Trash Items Grid */}
          {isGridView ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-3 md:gap-4">
              {trashItems.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden custom-scrollbar group relative cursor-pointer"
                >
                  {/* Checkbox for selection */}
                  <div className="absolute top-1.5 left-1.5 md:top-2 md:left-2 z-10">
                    <input
                      type="checkbox"
                      className="h-4 w-4 md:h-5 md:w-5 rounded border-gray-600 bg-gray-700 cursor-pointer"
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectItem(item.id);
                      }}
                    />
                  </div>

                  {/* Top section with icon */}
                  <div className="bg-[#2a2a2a] p-4 md:p-6 flex justify-center items-center rounded-t-[10px] group-hover:bg-[#333333] transition-colors duration-200">
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 rounded-md flex items-center justify-center ${
                        item.color || "bg-gray-600"
                      }`}
                    >
                      <img
                        src={item.iconUrl || "/placeholder.svg"}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="object-contain w-8 h-8 md:w-10 md:h-10"
                      />
                    </div>
                  </div>

                  {/* Bottom section with name and status */}
                  <div className="px-3 md:px-4 pb-3 md:pb-4 pt-2 md:pt-3 flex items-start justify-between bg-[#1e1e1e] group-hover:bg-[#252525] transition-all duration-200 rounded-b-[10px]">
                    <div>
                      <h3 className="font-medium text-sm md:text-base">
                        {item.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400 truncate max-w-[100px] md:max-w-[150px]">
                        {item.status}
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-200">
                      <MoreVertical className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              {trashItems.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden custom-scrollbar group relative cursor-pointer flex bg-[#1e1e1e] hover:bg-[#252525] transition-colors duration-200 rounded-[10px]"
                >
                  {/* Icon section */}
                  <div
                    className={`p-2 md:p-3 flex justify-center items-center bg-[#2a2a2a] group-hover:bg-[#333333] transition-colors duration-200 rounded-l-[10px] relative`}
                  >
                    {/* Checkbox for selection */}
                    <div className="absolute top-1 left-1 z-10">
                      <input
                        type="checkbox"
                        className="h-3 w-3 md:h-4 md:w-4 rounded border-gray-600 bg-gray-700 cursor-pointer"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleSelectItem(item.id);
                        }}
                      />
                    </div>

                    <div
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center ${
                        item.color || "bg-gray-600"
                      }`}
                    >
                      <img
                        src={item.iconUrl || "/placeholder.svg"}
                        alt={item.name}
                        width={24}
                        height={24}
                        className="object-contain w-5 h-5 md:w-6 md:h-6"
                      />
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="flex-1 px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-sm md:text-base">
                        {item.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-400">
                        {item.status}
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-200">
                      <MoreVertical className="h-4 w-4 md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
