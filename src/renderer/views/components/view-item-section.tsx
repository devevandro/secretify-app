"use client";

import { JSX } from "react";

import { Lock } from "lucide-react";
import ItemSection from "renderer/components/item-section";
import { useLocation } from "react-router-dom";

export function ViewItemSection({
  title,
  isGridView,
  children,
}: {
  isGridView: boolean;
  title: string;
  children: JSX.Element;
}) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className={`${
        !isGridView
          ? "h-full overflow-y-auto custom-scrollbar"
          : "h-full overflow-y-auto custom-scrollbar p-2 md:p-4 3xl:p-6"
      }`}
    >
      <div className={`${!isGridView && "p-2 md:p-4 3xl:p-6"}`}>
        {currentPath === "recentes" && (
          <div>
            <ItemSection
              title={title}
              icon={<Lock className="h-4 md:h-5 w-4 md:w-5" />}
            >
              {children}
            </ItemSection>
          </div>
        )}
        {currentPath !== "recentes" && <div>{children}</div>}
      </div>
    </div>
  );
}
