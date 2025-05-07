"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { SidebarItem } from "./sidebar-item";
import { ImgIcon } from "./img-icon";

export function SidebarFooter({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="mt-auto mb-3 md:mb-4">
      <SidebarItem
        icon={<ImgIcon src="security-gray.svg" />}
        label="Relatórios de Segurança"
        isOpen={isOpen}
      />
      <SidebarItem
        icon={<ImgIcon src="trash-gray.svg" />}
        label="Lixeira"
        isOpen={isOpen}
        href="/trash"
      />
    </div>
  );
}
