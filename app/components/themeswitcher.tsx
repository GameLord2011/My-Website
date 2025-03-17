"use client";

import { useTheme } from './ThemeContext';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-end pr-[8px]">
      <button onClick={toggleTheme} className="p-2 bg-[var(--nav-bkg)] rounded">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </div>
  );
};

export default ThemeSwitcher;