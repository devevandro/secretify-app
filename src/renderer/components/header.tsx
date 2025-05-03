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
      className={`draggable h-10 fixed top-0 w-full z-10 bg-[#141414] border-b border-[#141414] shadow-sm`}
    >
      <div className="container  mx-auto px-4 py-3" />
    </header>
  );
}
