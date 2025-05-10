import type React from "react";
interface ItemSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  isLast?: boolean;
}

export default function ItemSection({
  title,
  icon,
  children,
  isLast = false,
}: ItemSectionProps) {
  return (
    <div
      className={`${
        !isLast
          ? "mb-4 md:mb-6 pb-4 md:pb-6 border-b border-gray-800"
          : "mb-4 md:mb-6"
      }`}
    >
      <div className="flex items-center gap-1.5 md:gap-2 mb-3 md:mb-4">
        {icon && <span className="text-[#6eb5e6]">{icon}</span>}
        <h2 className="text-[#6eb5e6] text-base md:text-lg font-medium">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}
