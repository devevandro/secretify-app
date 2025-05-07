"use client";

import PasswordCardSkeleton from "renderer/components/password-card-skeleton";

export function SkeletonContent({ isGridView }: { isGridView: boolean }) {
  return (
    <>
      {isGridView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-8 gap-3 md:gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <PasswordCardSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <PasswordCardSkeleton key={index} listView={true} />
          ))}
        </div>
      )}
    </>
  );
}
