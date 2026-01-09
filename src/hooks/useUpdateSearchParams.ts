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
        return;
      }

      if ((key === 'genres' || key === 'platforms') && Array.isArray(value)) {
        const csv = value.join(','); // "puzzle,racing" [web:119]
        if (!csv) params.delete(key);
        else params.set(key, csv);
        return;
      }

      params.set(key, String(value));
    });

    router.push(`/?${params.toString()}`, { scroll: false });
  }

  return updateParams;
}
