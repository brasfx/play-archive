import Image from 'next/image';
import React from 'react';
import { useAppStore } from '@/providers/AppProvider';

export default function PublicProfileLayout({
  bgId,
  header,
  left,
  right,
}: {
  bgId?: string;
  header: React.ReactNode;
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  const profileBgId = useAppStore((s) => s.profileBgId);

  return (
    <div className="min-h-svh w-full">
      {(profileBgId || bgId) && (
        <Image
          src={`/bg/${profileBgId !== null ? profileBgId : bgId}.jpg`}
          alt="background"
          sizes="100vw"
          fill
          className="fixed inset-0 z-0 object-cover opacity-90 md:rounded-2xl"
          priority
        />
      )}

      <section className="mx-auto w-full max-w-6xl px-4 pt-8">{header}</section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-10">
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0 space-y-4">{left}</div>
          <aside className="space-y-4 lg:sticky lg:top-6">{right}</aside>
        </div>
      </section>
    </div>
  );
}
