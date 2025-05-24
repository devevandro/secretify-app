"use client";

import { JSX } from "react";

import { ViewItemSection } from "renderer/views/components/view-item-section";

export function GridContent({
  isGridView,
  viewType,
  filteredItems,
  groupedItems,
  children,
}: {
  isGridView: boolean;
  viewType: "type" | "all";
  filteredItems: any[];
  groupedItems: any;
  children: JSX.Element;
}) {
  return (
    <ViewItemSection
      title="Senhas"
      children={children}
      isGridView={isGridView}
      viewType={viewType}
    />
  );
}
