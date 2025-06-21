"use client";

import { JSX, useEffect, useRef, useState } from "react";

import { ItemDetailsPanelSkeleton } from "./item-details-panel-skeleton";
import { NoItem } from "./no-item";
import VerticalDivider from "./vertical-divider";
import { setIconUrl, verifyPassword } from "shared/utils/utils";
import { ItemDetailsPanelAdicionalInformations } from "./ui/item-details-panel/item-details-panel";
import { ItemDetailsPanelItems } from "./ui/item-details-panel/item-details-panel-items";
import { ItemsDetailsPanelHeader } from "./ui/item-details-panel/items-details-panel-header";

interface ItemDetailsPanelProps {
  selectedItem: any | null;
  isLoading?: boolean;
  setSelectedPassword: (item: any) => void;
}

export function ItemDetailsPanel({
  setSelectedPassword,
  selectedItem,
  isLoading = false,
}: ItemDetailsPanelProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [type, setType] = useState("");
  const [copy, setCopy] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profileMenuRef.current) {
      if (isProfileOpen) {
        profileMenuRef.current.style.maxHeight = `${profileMenuRef.current.scrollHeight}px`;
      } else {
        profileMenuRef.current.style.maxHeight = "0";
      }
    }
  }, [isProfileOpen]);

  const handleGetTextColor = (): JSX.Element | null => {
    const text = verifyPassword(selectedItem?.plaintext?.password || "");

    const config = {
      forte: {
        textColor: "#3EB554",
        bgColor: "#3EB55414",
      },
      média: {
        textColor: "#EDDF24",
        bgColor: "#F1C40F14",
      },
      fraca: {
        textColor: "#ED2A2A",
        bgColor: "#E54C5014",
      },
    };

    const style = config[text as keyof typeof config];
    if (!style) return null;

    return (
      <p
        className={`text-[${style.textColor}] bg-[${style.bgColor}] uppercase text-xs text-center rounded p-1 w-20 ml-2`}
      >
        {text}
      </p>
    );
  };

  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text || "");
    setTimeout(() => {
      setCopy(true);
      setType(type);
      setTimeout(() => {
        setCopy(false);
        setType("");
      }, 630);
    }, 350);
  };

  if (isLoading) {
    return <ItemDetailsPanelSkeleton />;
  }

  if (!selectedItem) {
    return (
      <NoItem
        title="Nenhum Item Selecionado!"
        subtitle="Selecione um item para ver seus detalhes."
      />
    );
  }

  return (
    <div className="pr-2 pl-2 h-full flex flex-col bg-[#000000] text-white">
      <div className="p-2 text-justify ">
        <div>
          <h2 className="font-extralight text-left my-2 text-[#E0E0E0]">
            Visualize, edite e acesse com um clique!
          </h2>
        </div>
      </div>

      <div className="border-t-2 border-r-2 border-l-2 border-[#141414] rounded-t-[8px]">
        <ItemsDetailsPanelHeader
          name={selectedItem?.plaintext.name}
          setIconUrl={setIconUrl}
          setSelectedPassword={setSelectedPassword}
          url={selectedItem.plaintext.url}
        />
      </div>

      <div className="border-2 border-[#141414] rounded-b-[8px] overflow-auto custom-scrollbar-transparent">
        <ItemDetailsPanelItems
          url={selectedItem.plaintext.url}
          copy={copy}
          type={type}
          password={selectedItem.plaintext.password}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          handleCopyToClipboard={handleCopyToClipboard}
        />
        <VerticalDivider borderColor="border-[#292929]" sizeBorderBottom="2" />
        <ItemDetailsPanelAdicionalInformations
          handleGetTextColor={handleGetTextColor}
          profileMenuRef={profileMenuRef}
          setIsProfileOpen={setIsProfileOpen}
          isProfileOpen={isProfileOpen}
        />
      </div>
    </div>
  );
}
