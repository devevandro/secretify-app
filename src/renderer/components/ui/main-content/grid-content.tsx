"use client";

import { Hash, Lock, Share2, Wrench } from "lucide-react";
import { JSX } from "react";
import ItemSection from "renderer/components/item-section";

export function GridContent({
  viewType,
  filteredDatas,
  groupedDatas,
  renderDatas,
}: {
  viewType: "type" | "all";
  filteredDatas: any[];
  groupedDatas: any;
  renderDatas: (data: any[]) => any;
}) {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-2 md:p-4 3xl:p-6">
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
  );
}
