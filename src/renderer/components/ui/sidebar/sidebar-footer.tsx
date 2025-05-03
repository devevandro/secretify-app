"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { SidebarItem } from "./sidebar-item";
import { ImgIcon } from "./img-icon";

export function SidebarFooter({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="mt-auto mb-3 md:mb-4">
      <div
        className={`${
          isOpen ? "mx-3" : "mx-auto w-6 md:w-8"
        } my-2 md:my-3 border-t border-gray-700`}
      ></div>
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
