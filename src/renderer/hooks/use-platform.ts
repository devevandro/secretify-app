"use client";

import { useState, useEffect } from "react";

type Platform = "windows" | "macos" | "other";

export function usePlatform() {
  const [platform, setPlatform] = useState<Platform>("other");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = window.navigator.userAgent.toLowerCase();

      if (userAgent.indexOf("win") !== -1) {
        setPlatform("windows");
        setIsDesktop(true);
      } else if (userAgent.indexOf("mac") !== -1) {
        setPlatform("macos");
        setIsDesktop(true);
      } else {
        setPlatform("other");
        setIsDesktop(false);
      }
    }
  }, []);

  return { platform, isDesktop };
}
