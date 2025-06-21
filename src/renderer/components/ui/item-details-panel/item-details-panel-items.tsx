import { Check, Copy, Eye, EyeOff, LinkIcon, User } from "lucide-react";

type ItemDetailsPanelItemsComponent = {
  type: string;
  copy: boolean;
  url: string;
  password: string;
  showPassword: boolean;
  setShowPassword: (showPassword: boolean) => void;
  handleCopyToClipboard: (text: string, type: string) => void;
};

export function ItemDetailsPanelItems(props: ItemDetailsPanelItemsComponent) {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="mb-6">
        <h3 className="text-sm text-[#E0E0E0] mb-2 flex items-center">
          <User className="h-4 w-4 mr-2" />
          Usuário
        </h3>
        <div className="flex items-center bg-[#141414] rounded p-2">
          <p className="text-[#666666] text-sm flex-1 truncate">
            {"usuario@email.com"}
          </p>
          <button
            className="text-[#666666] hover:text-[#58BFF5] p-1 cursor-pointer"
            onClick={() =>
              props.handleCopyToClipboard(
                "usuario@email.com",
                "Nome de usuário"
              )
            }
          >
            {props.copy && props.type === "Nome de usuário" ? (
              <Check className="h-4 w-4 text-[#3DFC46] cursor-pointer" />
            ) : (
              <Copy className="h-4 w-4 cursor-pointer" />
            )}
          </button>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-sm text-[#E0E0E0] mb-2 flex items-center">
          <LinkIcon className="h-4 w-4 mr-2" />
          Senha
        </h3>
        <div className="flex items-center bg-[#141414] rounded p-2">
          <p className="text-[#666666] text-sm flex-1 truncate">
            {props.showPassword ? props.password || "********" : "••••••••"}
          </p>
          <button
            className="text-[#666666] hover:text-[#58BFF5] p-1 mr-1"
            onClick={() => props.setShowPassword(!props.showPassword)}
          >
            {props.showPassword ? (
              <EyeOff className="h-4 w-4 cursor-pointer" />
            ) : (
              <Eye className="h-4 w-4 cursor-pointer" />
            )}
          </button>
          <button
            className="text-[#666666] hover:text-[#58BFF5] p-1 cursor-pointer"
            onClick={() =>
              props.handleCopyToClipboard(props.password || "********", "Senha")
            }
          >
            {props.copy && props.type === "Senha" ? (
              <Check className="h-4 w-4 text-[#3DFC46] cursor-pointer" />
            ) : (
              <Copy className="h-4 w-4 cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm text-[#E0E0E0] mb-2 flex items-center">
          <LinkIcon className="h-4 w-4 mr-2" />
          URL
        </h3>
        <div className="flex items-center bg-[#141414] rounded p-2">
          <p className="text-[#666666] text-sm flex-1 truncate">{props.url}</p>
          <button
            className="text-[#666666] hover:text-[#58BFF5] p-1 cursor-pointer"
            onClick={() => props.handleCopyToClipboard(`${props.url}`, "URL")}
          >
            {props.copy && props.type === "URL" ? (
              <Check className="h-4 w-4 text-[#3DFC46]" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
