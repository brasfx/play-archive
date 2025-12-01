'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme() as {
    theme: 'light' | 'dark' | 'system';
    setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark' | 'system'>>;
  };
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:text-accent-foreground dark:bg-input/30 size-9 dark:border-gray-700 dark:hover:bg-gray-800 border-gray-300 hover:bg-gray-100">
      <AnimatedThemeToggler />
    </div>
  );
}
