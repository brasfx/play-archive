'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

import { setLocale } from '@/actions/set-locale';
import { Button } from '@/components/ui/button';
import br from '@/images/brasil.png';
import usa from '@/images/usa.png';

const locales = [
  { code: 'en', label: 'English' },
  { code: 'pt-br', label: 'Português' },
] as const;

type Locale = (typeof locales)[number]['code'];

export default function LanguageSwitcher() {
  const router = useRouter();
  const currentLocale = useLocale();

  async function handleChangeLocale(newLocale: Locale) {
    await setLocale(newLocale);
    router.refresh();
  }

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
            aria-label={label}
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
