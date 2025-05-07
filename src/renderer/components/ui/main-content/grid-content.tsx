"use client";

import { Hash, Lock, Share2, Wrench } from "lucide-react";
import { JSX } from "react";
import PasswordSection from "renderer/components/password-section";

export function GridContent({
  viewType,
  filteredDatas,
  groupedDatas,
  renderDatas,
}: {
  viewType: "type" | "all";
  filteredDatas: any[];
  groupedDatas: any;
  renderDatas: (data: any[]) => JSX.Element;
}) {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar p-2 md:p-4 3xl:p-6">
      {viewType === "all" ? (
        <div>{renderDatas(filteredDatas)}</div>
      ) : (
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
  );
}
