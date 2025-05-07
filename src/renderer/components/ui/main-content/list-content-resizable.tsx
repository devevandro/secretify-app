"use client";

import { JSX } from "react";
import { Hash, List, Lock, Share2, Wrench } from "lucide-react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../resizable";
import PasswordSection from "renderer/components/password-section";
import PasswordDetailsPanel from "renderer/components/password-details-panel";

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
      {/* Left panel - Password list */}
      <ResizablePanel defaultSize={50} minSize={30} className="h-full">
        <div className="h-full overflow-y-auto custom-scrollbar">
          <div className="p-2 md:p-4 3xl:p-6">
            {viewType === "all" ? (
              // Show all passwords
              <div>{renderDatas(filteredDatas)}</div>
            ) : (
              // Show passwords grouped by type
              <div>
                <PasswordSection
                  title="Senhas Pessoais"
                  icon={<Lock className="h-4 md:h-5 w-4 md:w-5" />}
                >
                  {renderDatas(groupedDatas.personal)}
                </PasswordSection>

                <PasswordSection
                  title="Senhas Compartilhadas"
                  icon={<Share2 className="h-4 md:h-5 w-4 md:w-5" />}
                >
                  {renderDatas(groupedDatas.shared)}
                </PasswordSection>

                <PasswordSection
                  title="Mídias Sociais"
                  icon={<Hash className="h-4 md:h-5 w-4 md:w-5" />}
                >
                  {renderDatas(groupedDatas.social)}
                </PasswordSection>

                <PasswordSection
                  title="Ferramentas"
                  icon={<Wrench className="h-4 md:h-5 w-4 md:w-5" />}
                  isLast={true}
                >
                  {renderDatas(groupedDatas.tools)}
                </PasswordSection>
              </div>
            )}
          </div>
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
          selectedPassword={selectedData}
          isLoading={isLoading && selectedData === null}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
