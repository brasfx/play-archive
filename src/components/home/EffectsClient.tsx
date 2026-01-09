'use client';

import dynamic from 'next/dynamic';

export const ShineBorder = dynamic(
  () => import('@/components/ui/shine-border').then((m) => m.ShineBorder),
  { ssr: false },
);

export const Star = dynamic(
  () => import('@/components/animate-ui/icons/star').then((m) => m.Star),
  { ssr: false },
);

export const Disc3 = dynamic(
  () => import('@/components/animate-ui/icons/disc-3').then((m) => m.Disc3),
  { ssr: false },
);
