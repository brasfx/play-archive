'use client';

import SocialLoginCard from './socialLoginCard';

import { useSession, signOut } from 'next-auth/react';

export default function Page() {
  const { data: session } = useSession();
  const email = session?.user.email ?? '';
  const name = session?.user.name ?? '';
  const avatar = session?.user.image;
  const social = session?.user?.provider ?? 'google';
  return (
    <div className="flex items-center justify-center overflow-hidden mt-10 w-full">
      <SocialLoginCard
        name={name}
        email={email}
        image={avatar}
        social={social}
        onLogout={() => signOut({ callbackUrl: '/' })}
      />
    </div>
  );
}
