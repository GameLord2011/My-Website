"use client";

import { useTheme } from "./ThemeContext";
import clsx from "clsx";
import { useEffect } from "react";
import { useState } from "react";
import { UAParser } from "ua-parser-js";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    setIsMobile(result.device.type === "mobile");
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  return (
    <div className="flex justify-end pr-[8px]">
      <button
        onClick={toggleTheme}
        className={clsx(
          "rounded bg-[var(--nav-bkg)] transition-all duration-300 ease-in-out",
          {
            "p-[0px]": isMobile,
            "p-2": !isMobile 
          }
        )}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
