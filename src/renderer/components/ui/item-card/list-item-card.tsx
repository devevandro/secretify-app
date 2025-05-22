import { Star } from "lucide-react";

interface ListItemCardProps {
  isHovered: boolean;
  isFavorite: boolean;
  iconUrl?: string;
  name: string;
  description: string;
  handleToggleFavorite: (e?: React.MouseEvent) => void;
}

export default function ListItemCard({
  name,
  isFavorite,
  isHovered,
  iconUrl,
  description,
  handleToggleFavorite,
}: ListItemCardProps) {
  return (
    <>
      <div
        className={`p-2 md:p-3 flex justify-center items-center bg-[#000000] transition-colors duration-200 relative`}
      >
        <div
          className={`absolute top-1 left-1 text-gray-500 transition-opacity duration-200 ${
            isHovered ? "opacity-100" : "opacity-0"
          } z-10`}
          onClick={(e) => handleToggleFavorite(e)}
        >
          <Star
            className={`h-3 w-3 md:h-3.5 md:w-3.5 cursor-pointer ${
              isFavorite
                ? "text-[#6eb5e6] fill-[#6eb5e6]"
                : "hover:text-[#6eb5e6]"
            }`}
          />
        </div>

        {iconUrl ? (
          <div
            className={`w-8 h-8 md:w-15 md:h-14 rounded-md flex items-center justify-center bg-[#2a2a2a]`}
          >
            <img
              src={iconUrl || "/placeholder.svg"}
              alt={name}
              width={24}
              height={24}
              className="object-contain w-5 h-5 md:w-10 md:h-10"
            />
          </div>
        ) : (
          <div
            className={`w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center bg-transparent`}
          >
            <span className="text-white text-base md:text-lg font-bold">
              {name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 px-3 md:px-4 py-2 md:py-3 flex items-center bg-[#000000] justify-between">
        <div>
          <h3 className="font-medium text-sm md:text-base">{name}</h3>
          <p className="text-xs md:text-sm text-[#484848]">{description}</p>
        </div>
      </div>
    </>
  );
}
