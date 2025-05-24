"use client";

import { JSX } from "react";
import { Hash, List, Lock, Share2, Wrench } from "lucide-react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../../components/ui/resizable";
import ItemSection from "renderer/components/item-section";
import PasswordDetailsPanel from "renderer/components/item-details-panel";
import { ViewItemSection } from "renderer/views/components/view-item-section";

export function ListContentResizable({
  isLoading,
  isGridView,
  filteredDatas,
  groupedDatas,
  viewType,
  selectedData,
  children,
}: {
  isGridView: boolean;
  filteredDatas?: any;
  groupedDatas?: any;
  isLoading: boolean;
  viewType: "type" | "all";
  selectedData: any | null;
  children: JSX.Element;
}) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={50} minSize={30} className="h-full">
        <ViewItemSection
          title="Senhas"
          children={children}
          isGridView={isGridView}
          viewType={viewType}
        />
      </ResizablePanel>

      <ResizableHandle withHandle className="bg-[#292929] w-0.5" />

      <ResizablePanel
        defaultSize={50}
        minSize={30}
        className="bg-[#1a1a1a] overflow-y-auto custom-scrollbar"
      >
        <PasswordDetailsPanel
          selectedPassword={selectedData}
          isLoading={isLoading && selectedData === null}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
