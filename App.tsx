
import React, { useState, useEffect } from 'react';
import { Theme } from './types.ts';
import ThemeToggle from './components/ThemeToggle.tsx';
import Uploader from './components/Uploader.tsx';

const App: React.FC = () => {
  // Default to user's system preference, fallback to dark
  const [theme, setTheme] = useState<Theme>(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return Theme.Light;
    }
    return Theme.Dark;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === Theme.Dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="flex justify-between items-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Aura Media Uploader
          </h1>
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </header>
        <Uploader />
        <footer className="text-center mt-12 text-sm text-slate-400 dark:text-slate-600">
          <p>Designed for a seamless media upload experience.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;