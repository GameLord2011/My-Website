"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [, setUserPrefersDark] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isOverridden, setIsOverridden] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setUserPrefersDark(prefersDark);
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isOverridden) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setUserPrefersDark(prefersDark);
        const newTheme = prefersDark ? 'dark' : 'light';
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
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    setIsOverridden(true);
    console.log('Theme:', newTheme);
    console.log('is overridden:', isOverridden);
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
