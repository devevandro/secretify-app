import { MoreVertical, Star } from "lucide-react";

interface GridItemCardProps {
  isHovered: boolean;
  isFavorite: boolean;
  iconUrl?: string;
  name: string;
  description: string;
  moreButtonRef: React.RefObject<HTMLButtonElement | null>;
  handleMoreClick: (e: React.MouseEvent) => void;
  handleToggleFavorite: (e?: React.MouseEvent) => void;
}

export default function GridItemCard({
  name,
  isFavorite,
  isHovered,
  iconUrl,
  description,
  moreButtonRef,
  handleMoreClick,
  handleToggleFavorite,
}: GridItemCardProps) {
  return (
    <>
      <div className="bg-[#2a2a2a] p-4 md:p-8 flex justify-center items-center rounded-t-[6px] group-hover:bg-[#333333] transition-colors duration-200 cursor-pointer">
        <div
          className={`absolute top-1.5 left-1.5 md:top-2 md:left-2 text-gray-500 transition-opacity duration-200 ${
            isHovered || isFavorite ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => handleToggleFavorite(e)}
        >
          <Star
            className={`h-4 w-4 md:h-5 md:w-5 cursor-pointer ${
              isFavorite
                ? "text-[#6eb5e6] fill-[#6eb5e6]"
                : "hover:text-[#6eb5e6] hover:opacity-100"
            }`}
          />
        </div>

        {iconUrl ? (
          <div
            className={`w-12 h-12 md:w-16 md:h-10 rounded-md flex items-center justify-center bg-transparent`}
          >
            <img
              src={iconUrl || "/placeholder.svg"}
              alt={name}
              width={40}
              height={40}
              className="object-contain w-8 md:w-100 h-100"
            />
          </div>
        ) : (
          <div
            className={`w-12 h-12 md:w-16 md:h-16 rounded-md flex items-center justify-center bg-transparent`}
          >
            <span className="text-white text-xl md:text-2xl font-bold">
              {name?.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="px-3 md:px-4 pb-3 md:pb-4 pt-2 md:pt-3 flex items-start justify-between bg-transparent group-hover:bg-[#252525] transition-all duration-200 rounded-b-[10px]">
        <div>
          <h3 className="font-medium text-sm md:text-base">{name}</h3>
          <p className="text-xs md:text-sm text-gray-400 truncate max-w-[100px] md:max-w-[150px]">
            {description}
          </p>
        </div>
        <button
          ref={moreButtonRef}
          className="text-gray-400 hover:text-gray-200"
          onClick={handleMoreClick}
        >
          <MoreVertical className="h-4 w-4 md:h-5 md:w-5 cursor-pointer" />
        </button>
      </div>
    </>
  );
}
