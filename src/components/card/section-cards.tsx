'use client';

import * as React from 'react';
import { FormatDate, FormatYear } from '@/utils/formatDate';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Games } from '@/types/igdb';
import { RawgGame, Genre, Platform } from '@/types/rawg';
import Image from 'next/image';
import Link from 'next/link';
import SearchInput from '@/components/search/searchInput';

import noImage from '@/assets/images/no-image.jpg';
import { Button } from '../ui/button';

import { useFiltersFromURL } from '@/hooks/useFiltersFromURL';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';
import { CircleStar, Disc3, Plus, PlusCircle, Star, Stars } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface SectionCardsProps {
  games: RawgGame[] | Games;
}

export function SectionCards({ games }: SectionCardsProps) {
  const filters = useFiltersFromURL();
  const updateParms = useUpdateSearchParams();
  const t = useTranslations('homePage');

  const [searchTerm, setSearchTerm] = React.useState(filters.search || '');
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchTerm(value);
  }

  function handleSearchClick() {
    updateParms({ search: searchTerm });
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      updateParms({ search: searchTerm });
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
      <SearchInput
        handleChange={handleSearchChange}
        handleKeyPress={handleKeyPress}
        search={searchTerm}
        handleClick={handleSearchClick}
      />
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-6 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2  @5xl/main:grid-cols-4">
        {games?.map(
          ({
            id,
            name,

            background_image,
            genres,
            summary,
            total_rating,
            parent_platforms,
            platforms,
            released,
          }: RawgGame) => (
            <Card
              key={id}
              className="flex flex-col w-full max-w-[308px] max-h-[500px] gap-4"
            >
              <Image
                src={background_image ? `${background_image}` : noImage}
                alt={name}
                width={264}
                height={100}
                className="rounded-t-md w-full max-h-[188px] object-cover self-center bg-neutral-500 h-60"
              />
              <div className="flex flex-col grow">
                <CardHeader>
                  <CardTitle className="text-md font-semibold align-baseline">
                    {name}
                  </CardTitle>
                </CardHeader>

                <CardAction className="flex flex-wrap gap-2 px-4 mt-auto">
                  {genres?.slice(0, 2)?.map(({ name }: Genre) => {
                    return (
                      <Badge
                        key={name}
                        className="gap-2 px-3 py-1.5 bg-destructive"
                      >
                        {name}
                      </Badge>
                    );
                  })}
                </CardAction>
                <CardFooter className="flex-col items-start mt-4 text-muted-foreground text-sm">
                  {released && (
                    <div className="flex items-center gap-1">
                      <Star color="#f9d72f" width={20} /> {FormatYear(released)}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1 flex-wrap wrap-break-word word-break">
                    <Disc3 color="#744af3" width={20} />
                    {parent_platforms
                      ?.slice(0, 3)
                      ?.map(({ platform }: Platform) => platform.name)
                      .join(', ')}
                  </div>
                </CardFooter>
              </div>

              <div className="flex w-full m-auto pl-6 gap-4 justify-baseline ">
                <Link href={`/game/${id}`} key={id} className="no-underline">
                  <Button variant="outline">{t('details')}</Button>
                </Link>
                <Button className="flex items-center gap-2" variant="default">
                  {t('add')}
                </Button>
              </div>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}
