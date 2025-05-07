"use client";

import { Toaster } from "sonner";

export function ToasterContent({
  position,
  theme,
}: {
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "top-center"
    | "bottom-center";
  theme?: "light" | "dark" | "system";
}) {
  return (
    <Toaster
      position={position}
      closeButton
      richColors
      theme={theme}
      toastOptions={{
        className: "slide-in-from-right",
        duration: 4000,
      }}
    />
  );
}
