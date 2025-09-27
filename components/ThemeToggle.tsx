
import React from 'react';
import { Theme } from '../types.ts';
import { Icon } from './Icon.tsx';

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const isDark = theme === Theme.Dark;

  const toggleTheme = () => {
    setTheme(isDark ? Theme.Light : Theme.Dark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center h-8 w-14 p-1 rounded-full bg-slate-200 dark:bg-slate-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <div className="flex justify-between w-full text-slate-400">
        <Icon name="Sun" className="w-5 h-5" />
        <Icon name="Moon" className="w-5 h-5" />
      </div>
      <span
        className={`${
          isDark ? 'translate-x-6' : 'translate-x-0'
        } absolute top-1 left-1 inline-block w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out`}
      />
    </button>
  );
};

export default ThemeToggle;