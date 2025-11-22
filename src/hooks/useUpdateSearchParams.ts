'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import type { Filters } from '@/types/filters';

export function useUpdateSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParams(values: Partial<Filters>) {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(values).forEach(([key, value]) => {
      if (value === null || value === '' || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.push(`/?${params.toString()}`, { scroll: false });
  }

  return updateParams;
}
