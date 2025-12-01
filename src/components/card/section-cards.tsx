'use client';

import * as React from 'react';
import { FormatYear } from '@/utils/formatDate';

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

import { Lens } from '../ui/lens';
import { Pointer } from '../ui/pointer';
import { useSession, signIn } from 'next-auth/react';
import { ShineBorder } from '../ui/shine-border';
import { Disc3 } from '../animate-ui/icons/disc-3';
import { Star } from '../animate-ui/icons/star';

interface SectionCardsProps {
  games: RawgGame[] | Games;
  addButtonLabel: string;
  detaislButtonLabel: string;
  placeholderInput: string;
  labelInput: string;
}

export function SectionCards({
  games,
  addButtonLabel,
  detaislButtonLabel,
  placeholderInput,
  labelInput,
}: SectionCardsProps) {
  const filters = useFiltersFromURL();
  const updateParms = useUpdateSearchParams();
  const { status } = useSession();
  const [searchTerm, setSearchTerm] = React.useState(filters.search || '');
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchTerm(value);
  }

  function handleSearchClick() {
    updateParms({ search: searchTerm, search_exact: true });
    updateParms({ search: searchTerm });
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      updateParms({ search: searchTerm, search_exact: true });
    }
  }

  function handleAddItem() {
    if (status !== 'authenticated') {
      signIn();
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-6 z-10 py-4 md:py-6">
      <SearchInput
        handleChange={handleSearchChange}
        handleKeyPress={handleKeyPress}
        search={searchTerm}
        handleClick={handleSearchClick}
        placeholder={placeholderInput}
        label={labelInput}
      />

      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-6 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2  @5xl/main:grid-cols-4">
        {games?.map(
          ({
            id,
            name,
            background_image,
            genres,
            parent_platforms,
            released,
          }: RawgGame) => (
            <Card
              key={id}
              className="flex relative flex-col w-full max-w-[308px] max-h-[500px] gap-4 z-10"
            >
              <ShineBorder
                key={id}
                shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']}
              />
              <div>
                <Lens lensSize={150} isStatic={false} ariaLabel="Zoom Area">
                  <Image
                    src={background_image ? `${background_image}` : noImage}
                    alt={name}
                    width={264}
                    height={100}
                    className="rounded-t-md w-full p-0.5 max-h-[188px] object-cover self-center bg-neutral-500 h-60"
                  />
                </Lens>
                <Pointer>
                  <div className="text-2xl">🔍</div>
                </Pointer>
              </div>
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
                      <Star animateOnHover color="#f9d72f" width={20} />{' '}
                      {FormatYear(released)}
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1 flex-wrap wrap-break-word word-break">
                    <Disc3 animateOnHover color="#744af3" width={20} />
                    {parent_platforms
                      ?.slice(0, 3)
                      ?.map(({ platform }: Platform) => platform.name)
                      .join(', ')}
                  </div>
                </CardFooter>
              </div>

              <div className="flex w-full m-auto pl-6 gap-4 justify-baseline ">
                <Link href={`/game/${id}`} key={id} className="no-underline">
                  <Button variant="outline">{detaislButtonLabel}</Button>
                </Link>
                <Button
                  className="flex items-center gap-2"
                  variant="default"
                  onClick={handleAddItem}
                >
                  {addButtonLabel}
                </Button>
              </div>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}
