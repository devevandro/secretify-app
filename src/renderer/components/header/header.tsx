"use client";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`draggable w-full border-b-2 border-[#000000] shadow-sm bg-[#1e1e1e] ${
        currentPath === "/" ||
        currentPath === "/verify" ||
        currentPath === "/signup"
          ? "h-10 fixed"
          : "pb-3 sticky"
      } top-0 z-10`}
    >
      <div className="container  mx-auto px-4 py-3" />
    </header>
  );
}
