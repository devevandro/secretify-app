"use client";

import ItemCardSkeleton from "renderer/components/item-card-skeleton";

export function GridViewSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-3 md:gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <ItemCardSkeleton key={index} />
      ))}
    </div>
  );
}
