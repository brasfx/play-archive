'use server';

import { cookies } from 'next/headers';

export async function setLocale(locale: string) {
  const cookieStore = await cookies();
  await cookieStore.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  });
}

export async function getLocale() {
  const cookieStore = await cookies();
  const locale = await cookieStore.get('locale');
  return locale;
}
