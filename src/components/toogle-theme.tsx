'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

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
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="dark:border-gray-700 dark:hover:bg-gray-800 border-gray-300 hover:bg-gray-100"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90 text-warning" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0 text-gray-600 dark:text-primary" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
