"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [prefersDark, setprefersDark] = useState(true);
  const [theme, setTheme] = useState('light');
  const [isOverridden, setIsOverridden] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setprefersDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      setTheme(prefersDark ? 'dark' : 'light');
      console.info('prefersDark:', prefersDark);
    }
  }, [prefersDark]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isOverridden) {
        setprefersDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
        const newTheme = prefersDark ? 'dark' : 'light';
        setTheme(newTheme);
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, [isOverridden, prefersDark]);

  useEffect(() => {
    document.documentElement.classList.add(theme);
    return () => {
      document.documentElement.classList.remove(theme);
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if ((prefersDark && newTheme === 'dark') || (!prefersDark && newTheme === 'light')) {
      setIsOverridden(false);
    } else {
      setIsOverridden(true);
    }
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
