"use client";

import { useTheme } from "./ThemeContext";
import clsx from "clsx";
import { isMobileCheck } from "components/isMobile";

const ThemeSwitcher = ({ pad }: { pad?: boolean }) => {
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
                        "p-[0px]": isMobile && pad,
                        "p-2": !isMobile || (isMobile && !pad),
                    },
                )}
            >
                {theme === "light" ? "☀️" : "🌙"}
            </button>
        </div>
    );
};

export default ThemeSwitcher;
