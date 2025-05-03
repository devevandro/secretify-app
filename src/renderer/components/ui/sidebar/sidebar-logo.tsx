"use client";

import type React from "react";

export function SidebarLogo({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="p-3 md:p-4 flex items-center">
      {!isOpen && (
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-2">
          <img src="/img/logo-header-closed.png" />
        </div>
      )}
      {isOpen && <img src="/img/logo-header.png" alt="" className="w-40" />}
    </div>
  );
}
