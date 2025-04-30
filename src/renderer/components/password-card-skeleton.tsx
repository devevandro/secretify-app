"use client";

interface PasswordCardSkeletonProps {
  listView?: boolean;
}

export default function PasswordCardSkeleton({
  listView = false,
}: PasswordCardSkeletonProps) {
  if (listView) {
    // List view skeleton
    return (
      <div className="overflow-hidden flex bg-[#1e1e1e] rounded-[10px] animate-pulse">
        {/* Icon section */}
        <div className="p-2 md:p-3 flex justify-center items-center bg-[#2a2a2a] rounded-l-[10px]">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-md bg-gray-700"></div>
        </div>

        {/* Content section */}
        <div className="flex-1 px-3 md:px-4 py-2 md:py-3 flex items-center justify-between">
          <div className="w-full">
            <div className="h-4 md:h-5 w-24 md:w-32 bg-gray-700 rounded mb-2"></div>
            <div className="h-3 md:h-4 w-16 md:w-20 bg-gray-700 opacity-70 rounded"></div>
          </div>
          <div className="h-4 w-4 md:h-5 md:w-5 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  // Grid view skeleton
  return (
    <div className="overflow-hidden animate-pulse">
      {/* Top section */}
      <div className="bg-[#2a2a2a] p-4 md:p-6 flex justify-center items-center rounded-t-[10px]">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-md bg-gray-700"></div>
      </div>

      {/* Bottom section */}
      <div className="px-3 md:px-4 pb-3 md:pb-4 pt-2 md:pt-3 flex items-start justify-between bg-[#1e1e1e] rounded-b-[10px]">
        <div className="w-full">
          <div className="h-4 md:h-5 w-24 md:w-32 bg-gray-700 rounded mb-2"></div>
          <div className="h-3 md:h-4 w-16 md:w-20 bg-gray-700 opacity-70 rounded"></div>
        </div>
        <div className="h-4 w-4 md:h-5 md:w-5 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
}
