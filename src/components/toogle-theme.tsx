'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  console.log('Current theme:', theme);

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="dark:border-gray-700 dark:hover:bg-gray-800 border-gray-300 hover:bg-gray-100"
    >
      {theme === 'dark' ? (
        <Moon className="w-5 h-5 text-gray-600 dark:text-primary" />
      ) : (
        <Sun className="w-5 h-5 text-warning" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
