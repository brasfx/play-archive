'use client';
import * as React from 'react';
import { setLocale } from '@/actions/set-locale';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import br from '@/images/brasil.png';
import usa from '@/images/usa.png';

export default function LanguageSwitcher() {
  const [currentLocale, setCurrentLocale] = React.useState('pt-br');
  const router = useRouter();

  async function handleChangeLocale(newLocale: string) {
    await setLocale(newLocale);
    router.refresh();
    setCurrentLocale(newLocale);
  }

  const locales = [
    { code: 'en', label: 'English' },
    { code: 'pt-br', label: 'Português' },
  ];

  return (
    <div>
      {locales
        .filter(({ code }) => code !== currentLocale)
        .map(({ code, label }) => (
          <Button
            key={code}
            variant="outline"
            size="icon"
            onClick={() => handleChangeLocale(code)}
            className="dark:border-gray-700 dark:hover:bg-gray-800 border-gray-300 hover:bg-gray-100"
          >
            <Image
              src={code === 'en' ? usa : br}
              alt={label}
              className="h-5 w-5"
            />
          </Button>
        ))}
    </div>
  );
}
