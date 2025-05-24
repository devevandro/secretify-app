"use client";

import { JSX } from "react";

import { Lock } from "lucide-react";
import ItemSection from "renderer/components/item-section";

export function ViewItemSection({
  title,
  viewType,
  isGridView,
  children,
}: {
  isGridView: boolean;
  viewType: "type" | "all";
  title: string;
  children: JSX.Element;
}) {
  return (
    <div
      className={`${
        !isGridView
          ? "h-full overflow-y-auto custom-scrollbar"
          : "h-full overflow-y-auto custom-scrollbar p-2 md:p-4 3xl:p-6"
      }`}
    >
      <div className={`${!isGridView && "p-2 md:p-4 3xl:p-6"}`}>
        {viewType === "all" ? (
          <div>{children}</div>
        ) : (
          <div>
            <ItemSection
              title={title}
              icon={<Lock className="h-4 md:h-5 w-4 md:w-5" />}
            >
              {children}
            </ItemSection>
          </div>
        )}
      </div>
    </div>
  );
}
