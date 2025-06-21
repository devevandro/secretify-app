import { JSX } from "react";
import { ImgIcon } from "../sidebar/img-icon";
import { ChevronDown } from "lucide-react";

type ItemDetailsPanelAdicionalInformationsComponent = {
  isProfileOpen: boolean;
  profileMenuRef: any;
  handleGetTextColor: () => JSX.Element | null;
  setIsProfileOpen: (isProfileOpen: boolean) => void;
};

export function ItemDetailsPanelAdicionalInformations(
  props: ItemDetailsPanelAdicionalInformationsComponent
) {
  return (
    <div className="relative">
      <button
        className="relative p-4 flex items-center cursor-pointer justify-between w-full text-left transition-colors duration-300"
        onClick={() => props.setIsProfileOpen(!props.isProfileOpen)}
      >
        <div className="relative z-10 flex items-center w-full">
          <div className="flex items-center space-x-2">
            <ImgIcon src="error-blue.svg" width="w-5" cursor="cursor-pointer" />
            <p className="text-xs md:text-xl text-[#58BFF5]">
              Informações adicionais
            </p>
          </div>
          <div className="ml-auto text-[#58BFF5]">
            <ChevronDown
              className={`h-4 w-4 md:h-5 md:w-5 transform transition-transform duration-300 ${
                props.isProfileOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </div>
      </button>

      <div
        ref={props.profileMenuRef}
        className="overflow-hidden custom-scrollbar transition-all duration-300 ease-in-out"
        style={{ maxHeight: 0 }}
      >
        <div className="flex-1 overflow-y-auto pl-4 pr-4 pb-4">
          <div className="flex items-center text-sm">
            <h3 className="text-sm text-[#E0E0E0]">Saúde da Senha:</h3>
            <div>{props.handleGetTextColor()}</div>
          </div>
          <div className="space-y-4 mt-2">
            <div className="flex items-center text-sm">
              <span className="text-[#E0E0E0]">Criado em:</span>
              <span className="text-[#666666] ml-2">03/04/2025</span>
            </div>

            <div className="flex items-center text-sm">
              <span className="text-[#E0E0E0]">Última modificação:</span>
              <span className="text-[#666666] ml-2">03/04/2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
