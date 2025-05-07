"use client";

import type React from "react";

export function ListViewContent({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col space-y-2">{children}</div>;
}
