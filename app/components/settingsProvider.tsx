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

const AnimationContext = createContext({
    anims: false,
    hasLoadedAnims: false,
    toggleAnims: () => {},
});

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export default function SettingsProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [anims, setAnims] = useState(true);
    const [hasLoadedAnims, setHasLoadedAnims] = useState(false);

    useLayoutEffect(() => {
        const stored = localStorage.getItem("animations");
        if (stored === null) {
            startTransition(() => {
                setAnims(true);
                setHasLoadedAnims(true);
            });
        } else {
            startTransition(() => {
                setAnims(stored?.includes("yurp") ? true : false);
                setHasLoadedAnims(true);
            });
        }
    }, []);

    useEffect(() => {
        if (hasLoadedAnims) {
            localStorage.setItem("animations", anims ? "yurp" : "nope");
        }
    }, [anims, hasLoadedAnims]);

    const toggleAnims = () => setAnims((prev) => !prev);

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
            <AnimationContext.Provider
                value={{ anims, toggleAnims, hasLoadedAnims }}
            >
                {children}
            </AnimationContext.Provider>
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export const useAnimations = () => useContext(AnimationContext);
