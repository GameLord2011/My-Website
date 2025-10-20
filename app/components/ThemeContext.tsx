"use client";

import { createContext, startTransition } from "react";
import { useContext } from "react";
import { useState } from "react";
import { ReactNode } from "react";
import { useEffect } from "react";
import { useLayoutEffect } from "react";

type ThemeContextType = {
    theme: string;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    //const [prefersDark, setprefersDark] = useState(true);
    const [theme, setTheme] = useState("dark");
    const [isOverridden, setIsOverridden] = useState(false);

    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            const storedTheme = localStorage.getItem("theme");
            if (storedTheme !== null) {
                startTransition(() => {
                    setTheme(storedTheme);
                });
            } else {
                const prefersDark = window.matchMedia(
                    "(prefers-color-scheme: dark)",
                ).matches;
                const defaultTheme = prefersDark ? "dark" : "light";
                localStorage.setItem("theme", defaultTheme);
                startTransition(() => {
                    setTheme(defaultTheme);
                });
            }
        }
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e: MediaQueryListEvent) => {
            if (!isOverridden) {
                const newTheme = e.matches ? "dark" : "light";
                //setprefersDark(e.matches);
                setTheme(newTheme);
                localStorage.setItem("theme", newTheme);
            }
        };

        // Initial check
        //setprefersDark(mediaQuery.matches);

        // Add listener
        mediaQuery.addEventListener("change", handleChange);

        // Cleanup
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [isOverridden]);

    useEffect(() => {
        document.documentElement.classList.add(theme);
        return () => {
            document.documentElement.classList.remove(theme);
        };
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        setIsOverridden(
            newTheme !==
                (window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"),
        );
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
