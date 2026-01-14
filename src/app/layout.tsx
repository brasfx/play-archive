import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import './globals.css';
import { ThemeProvider } from '../components/theme-provider';
import MainLayout from '@/components/layout/main';
import { AppStoreProvider } from '@/providers/AppProvider';
import SessionProvider from '@/components/sessionProvider/SessionProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'PlayArchive',
  description:
    'PlayArchive é uma aplicação web pensada para quem quer organizar, explorar e compartilhar sua biblioteca pessoal de jogos.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
              <AppStoreProvider>
                <MainLayout>{children}</MainLayout>
              </AppStoreProvider>
            </NextIntlClientProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
