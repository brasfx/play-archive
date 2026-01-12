'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Gamepad2, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import library from '@/assets/images/library.png';
import libraryLight from '@/assets/images/library-light.png';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';

export function LoginForm() {
  const pathname = usePathname();
  const [loading, setLoading] = React.useState<'github' | 'google' | null>(
    null,
  );
  const { theme = 'system' } = useTheme();

  const backgroundImage = theme === 'light' ? libraryLight : library;

  async function handleSignIn(provider: 'github' | 'google') {
    try {
      setLoading(provider);

      await signIn(provider, { callbackUrl: pathname || '/' });
    } finally {
      setLoading(null);
    }
  }

  const t = useTranslations('login');

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-6xl grid-cols-1 lg:grid-cols-[1fr_480px]">
      <div className="relative hidden overflow-hidden border-r bg-muted/20 lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.18),transparent_45%),radial-gradient(circle_at_70%_60%,hsl(var(--ring)/0.12),transparent_40%)]" />

        <div className="relative z-10 flex w-full flex-col p-10">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Gamepad2 className="h-5 w-5" />
            PlayArchive
          </Link>

          <div className="mt-8 hidden lg:block">
            <div className="relative  w-full aspect-square">
              <Image
                src={backgroundImage}
                alt="imagem de fundo"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-contain opacity-90 [mask-[linear-gradient(to_bottom,black,transparent)]"
              />
            </div>
          </div>

          <div className="mt-auto pb-10 space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight">
              {t('organize')}
            </h2>
            <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4 sm:p-8">
        <div className="w-full max-w-sm sm:max-w-md text-center lg:hidden">
          <h1 className="text-2xl font-semibold tracking-tight">
            Organize sua biblioteca.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{t('subtitle')}</p>
        </div>

        <Card className="w-full max-w-sm sm:max-w-md p-10">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 font-medium"
              >
                <Gamepad2 className="h-5 w-5" />
                PlayArchive
              </Link>
            </CardTitle>
            <CardDescription>{t('title')}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-center gap-2"
              type="button"
              onClick={() => handleSignIn('github')}
              disabled={loading !== null}
            >
              {loading === 'github' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                  />
                </svg>
              )}
              {t('github')}
            </Button>

            <Button
              variant="outline"
              className="w-full justify-center gap-2"
              type="button"
              onClick={() => handleSignIn('google')}
              disabled={loading !== null}
            >
              {loading === 'google' ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
              )}
              {t('google')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
