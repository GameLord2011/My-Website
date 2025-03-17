"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

let userPrefersDark = false;

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return userPrefersDark ? 'dark' : 'light';
    }
    return 'light';
  });

  const [isOverridden, setIsOverridden] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isOverridden) {
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const newTheme = userPrefersDark ? 'dark' : 'light';
        setTheme(newTheme);
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, [isOverridden]);

  useEffect(() => {
    document.documentElement.classList.add(theme);
    return () => {
      document.documentElement.classList.remove(theme);
    };
  }, [theme]);

  const toggleTheme = () => {
    setIsOverridden(true);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (((userPrefersDark = true) && (newTheme === 'dark')) || ((userPrefersDark = false) && (newTheme === 'light'))) {
      setIsOverridden(false);
    }
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
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
