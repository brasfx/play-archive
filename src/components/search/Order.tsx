'use client';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import { orderBy, TypeOrderBy } from '@/constants/filters';
import { ArrowDownUp, ArrowUpDown, ListOrdered, X } from 'lucide-react';
import { useFiltersFromURL } from '@/hooks/useFiltersFromURL';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';
import { Button } from '../ui/button';
import { SelectSeparator } from '../ui/select';
import { useTranslations } from 'next-intl';

export default function Order() {
  const t = useTranslations('filters');
  const filters = useFiltersFromURL();
  const updateParms = useUpdateSearchParams();
  const [selectedItem, setSelectedItem] = React.useState<string | undefined>(
    filters.ordering || '',
  );

  function clearOrder() {
    setSelectedItem('');
    updateParms({ ordering: null });
  }

  return (
    <Select
      value={selectedItem}
      onValueChange={(value: string) => {
        setSelectedItem(value);
        updateParms({ ordering: value });
      }}
      className="h-10 bg-purple md:w-auto w-full"
    >
      <SelectTrigger className="rounded-2xl bg-purple text-white hover:bg-purple/90 md:w-auto w-full">
        {selectedItem === '' ? (
          <ListOrdered />
        ) : selectedItem?.startsWith('-') ? (
          <ArrowUpDown />
        ) : (
          <ArrowDownUp />
        )}

        <SelectValue
          placeholder={t('orderBy')}
          value={selectedItem}
          className="text-white"
        />
      </SelectTrigger>
      <SelectContent className="bg-foreground dark:bg-background text-white">
        <SelectGroup className="bg-foreground dark:bg-background text-white">
          {selectedItem !== '' && (
            <Button
              variant="destructive"
              onClick={clearOrder}
              className="w-full justify-between"
            >
              {t('clear2')} <X className="h-4 w-4" />
            </Button>
          )}
          {orderBy.map((item: TypeOrderBy) => (
            <SelectItem
              value={item.value}
              key={item.value}
              className="text-white"
            >
              {t(item.value)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
