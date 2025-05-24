"use client";

import ItemCardSkeleton from "renderer/components/item-card-skeleton";

export function ListViewSkeleton() {
  return (
    <div className="flex flex-col space-y-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <ItemCardSkeleton key={index} listView={true} />
      ))}
    </div>
  );
}
