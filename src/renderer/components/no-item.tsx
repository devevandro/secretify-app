"use client";

export function NoItem({
  title,
  subtitle,
  isGridView = false,
}: {
  title: string;
  subtitle: string;
  isGridView?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 bg-[#000000] ${
        isGridView ? "min-h-[calc(90vh-120px)]" : "h-full"
      }`}
    >
      <div className="mb-2">
        <img src="/svg/no-item-selected.svg" alt="" width={80} height={80} />
      </div>
      <h3 className="text-xl font-medium text-[#8F8F8F] mb-2">{title}</h3>
      <p className="text-[#666666] text-sm">{subtitle}</p>
    </div>
  );
}
