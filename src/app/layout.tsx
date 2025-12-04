import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import './globals.css';
import { ThemeProvider } from '../components/theme-provider';
import MainLayout from '@/components/layout/main';
import { FiltersProvider } from '@/providers/FiltersProvider';
import SessionProvider from '@/components/sessionProvider/sessionProvider';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
            <NextIntlClientProvider>
              <FiltersProvider>
                <MainLayout>{children}</MainLayout>
              </FiltersProvider>
            </NextIntlClientProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
