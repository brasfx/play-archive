'use client';

import React, { useState } from 'react';
import SearchInput from '@/components/search/SearchInput';
import { InputGroupAddon } from '@/components/ui/input-group';
import { useFiltersFromURL } from '@/hooks/useFiltersFromURL';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';
import dynamic from 'next/dynamic';

const Filters = dynamic(() => import('@/components/search/Filters'), {
  ssr: false,
});

const Order = dynamic(() => import('@/components/search/Order'), {
  ssr: false,
});

export default function SearchBarClient({
  placeholder,
  label,
}: {
  placeholder: string;
  label: string;
}) {
  const filters = useFiltersFromURL();
  const updateParams = useUpdateSearchParams();
  const [searchTerm, setSearchTerm] = useState(filters.search || '');

  function submitSearch(next?: string) {
    updateParams({ search: (next ?? searchTerm).trim() });
  }

  return (
    <div className="flex flex-row gap-2 align-middle p-6 justify-center md:justify-between flex-wrap w-full">
      <SearchInput
        handleChange={(e) => setSearchTerm(e.target.value)}
        handleKeyPress={(e) => e.key === 'Enter' && submitSearch()}
        search={searchTerm}
        handleClick={() => submitSearch()}
        placeholder={placeholder}
        label={label}
      />

      <InputGroupAddon
        align="inline-end"
        className="md:w-auto w-full h-full z-10 flex flex-col md:flex-row gap-4 items-center px-0"
      >
        <Order />
        <Filters />
      </InputGroupAddon>
    </div>
  );
}
