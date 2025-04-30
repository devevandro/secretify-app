"use client";

import { useState, useEffect, useRef } from "react";
import { usePlatform } from "../hooks/use-platform";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header
      className={`draggable pb-2 w-full bg-[#2a2626] border-gray-900 border-b shadow-sm sticky top-0 z-10`}
    >
      <div className="container  mx-auto px-4 py-3" />
    </header>
  );
}
