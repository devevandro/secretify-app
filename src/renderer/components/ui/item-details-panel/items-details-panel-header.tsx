import { ImgIcon } from "../sidebar/img-icon";

type ItemsDetailsPanelHeaderProps = {
  editMode: boolean;
  url: string;
  name: string;
  handleEditItem: () => void;
  setIconUrl: (url: string) => string | undefined;
  setSelectedPassword: (item: any) => void;
};

export function ItemsDetailsPanelHeader(props: ItemsDetailsPanelHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="p-4 flex items-center">
        <div
          className={`w-10 h-10 rounded-md flex items-center justify-center mr-3 bg-[#222222]`}
        >
          {
            <img
              src={props.setIconUrl(props.url || "")}
              alt=""
              width={24}
              height={24}
              className="object-contain"
            />
          }
        </div>
        <div>
          <h2 className="text-lg font-medium text-[#E0E0E0]">
            {props.name || ""}
          </h2>
          <p className="text-sm text-[#666666]">Não Compartilhado</p>
        </div>
      </div>
      <div className="flex items-center p-4 space-x-2">
        <ImgIcon
          src="edit-icon.svg"
          width="w-7"
          cursor={`${props.editMode ? "" : "cursor-pointer"}`}
          onClick={props.handleEditItem}
          disabled={props.editMode}
        />
        {!props.editMode && (
          <>
            <ImgIcon
              src="star-outline-gray.svg"
              width="w-6"
              cursor="cursor-pointer"
            />
            <ImgIcon src="trash-gray.svg" width="w-3" cursor="cursor-pointer" />
            <ImgIcon
              src="close-icon.svg"
              width="w-7"
              cursor="cursor-pointer"
              onClick={() => props.setSelectedPassword(null)}
            />
          </>
        )}
      </div>
    </div>
  );
}
