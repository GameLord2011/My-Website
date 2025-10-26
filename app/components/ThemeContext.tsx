"use client";

import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import { startTransition } from "react";
import type { ReactNode } from "react";

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<string>("dark");
    const [isOverridden, setIsOverridden] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (typeof window === "undefined") return;

        const appliedTheme = document.documentElement.classList.contains("dark")
            ? "dark"
            : "light";
        const hasOverride = localStorage.getItem("theme") !== null;

        startTransition(() => {
            setTheme(appliedTheme);
            setIsOverridden(hasOverride);
        });
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const opposite = theme === "dark" ? "light" : "dark";
        document.documentElement.classList.remove(opposite);
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        if (typeof window === "undefined" || isOverridden) return;

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e: MediaQueryListEvent) => {
            const newTheme = e.matches ? "dark" : "light";
            startTransition(() => setTheme(newTheme));
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [isOverridden]);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        setIsOverridden(true);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
