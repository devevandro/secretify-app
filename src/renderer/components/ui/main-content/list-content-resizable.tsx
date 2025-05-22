"use client";

import { JSX } from "react";
import { Hash, List, Lock, Share2, Wrench } from "lucide-react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../resizable";
import ItemSection from "renderer/components/item-section";
import PasswordDetailsPanel from "renderer/components/item-details-panel";

export function ListContentResizable({
  isLoading,
  viewType,
  filteredDatas,
  groupedDatas,
  selectedData,
  renderDatas,
}: {
  isLoading: boolean;
  viewType: "type" | "all";
  filteredDatas: any[];
  groupedDatas: any;
  selectedData: any | null;
  renderDatas: (data: any[]) => JSX.Element;
}) {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={50} minSize={30} className="h-full">
        <div className="h-full overflow-y-auto custom-scrollbar">
          <div className="p-2 md:p-4 3xl:p-6">
            {viewType === "all" ? (
              <div>{renderDatas(filteredDatas)}</div>
            ) : (
              <div>
                <ItemSection
                  title="Senhas Pessoais"
                  icon={<Lock className="h-4 md:h-5 w-4 md:w-5" />}
                >
                  {renderDatas(groupedDatas.personal)}
                </ItemSection>

                <ItemSection
                  title="Senhas Compartilhadas"
                  icon={<Share2 className="h-4 md:h-5 w-4 md:w-5" />}
                >
                  {renderDatas(groupedDatas.shared)}
                </ItemSection>

                <ItemSection
                  title="Mídias Sociais"
                  icon={<Hash className="h-4 md:h-5 w-4 md:w-5" />}
                >
                  {renderDatas(groupedDatas.social)}
                </ItemSection>

                <ItemSection
                  title="Ferramentas"
                  icon={<Wrench className="h-4 md:h-5 w-4 md:w-5" />}
                  isLast={true}
                >
                  {renderDatas(groupedDatas.tools)}
                </ItemSection>
              </div>
            )}
          </div>
        </div>
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
