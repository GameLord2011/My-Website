"use client";

import { useTheme } from "./ThemeContext";

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex justify-end pr-[8px]">
            <button
                type="button"
                onClick={toggleTheme}
                className="rounded bg-[var(--nav-bkg)] p-2 transition-all duration-300 ease-in-out"
            >
                {theme === "light" ? "☀️" : "🌙"}
            </button>
        </div>
    );
};

export default ThemeSwitcher;
