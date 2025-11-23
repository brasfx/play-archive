'use client';
import { getSession } from 'next-auth/react';

export async function getSessionData() {
  const session = await getSession();

  return {
    name: session?.user.name,
    email: session?.user.email,
    image: session?.user.image,
  };
}
