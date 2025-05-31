"use client";

import { useTheme } from "./ThemeContext";
import clsx from "clsx";
import { isMobileCheck } from "components/isMobile";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const isMobile = isMobileCheck();

  return (
    <div className="flex justify-end pr-[8px]">
      <button
        type="button"
        onClick={toggleTheme}
        className={clsx(
          "rounded bg-[var(--nav-bkg)] transition-all duration-300 ease-in-out",
          {
            "p-[0px]": isMobile,
            "p-2": !isMobile,
          },
        )}
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
