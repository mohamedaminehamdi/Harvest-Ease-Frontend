import React, { useEffect, useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check system preference
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem('theme');
    
    if (stored) {
      setIsDark(stored === 'dark');
    } else {
      setIsDark(isDarkMode);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark, mounted]);

  return { isDark, setIsDark, mounted };
}
