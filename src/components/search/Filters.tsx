'use client';

import * as React from 'react';
import {
  genreFilters,
  type GenreFilters,
  platforms,
  type PlatformFilters,
} from '@/constants/filters';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { useFiltersFromURL } from '@/hooks/useFiltersFromURL';
import { useUpdateSearchParams } from '@/hooks/useUpdateSearchParams';

import { Separator } from '../ui/separator';
import { useTranslations } from 'next-intl';
import { ListFilter } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function Filters({}) {
  const filters = useFiltersFromURL();
  const updateParms = useUpdateSearchParams();
  const t = useTranslations('filters');
  const [open, setOpen] = React.useState(false);
  const filterParam = filters.genres !== '' && filters.genres?.split(',');
  const filterParamPlatforms =
    filters.platforms !== '' && filters.platforms?.split(',');
  const [selectedGenres, setSelectedGenres] = React.useState<string[]>(
    filterParam || [],
  );
  const [selectedPlatforms, setSelectedPlatforms] = React.useState<string[]>(
    filterParamPlatforms || [],
  );

  function handleClick() {
    updateParms({
      genres: selectedGenres.length > 0 ? selectedGenres : undefined,
      platforms: selectedPlatforms.length > 0 ? selectedPlatforms : undefined,
    });
  }

  const topGenres = React.useMemo(
    () =>
      [...genreFilters]
        .sort((a, b) => b.gamesCount - a.gamesCount)
        .slice(0, 10),
    [],
  );

  const allGenresSorted = React.useMemo(
    () => [...genreFilters].sort((a, b) => a.name.trim().localeCompare(b.name)),
    [],
  );

  const allPlatformsSorted = React.useMemo(
    () => [...platforms].sort((a, b) => a.name.trim().localeCompare(b.name)),
    [],
  );

  const handleSelectGenres = (genre: string) => {
    const genreIsSelected = selectedGenres.includes(genre);
    if (!genreIsSelected) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      const filter = selectedGenres.filter((g) => g !== genre);
      setSelectedGenres(filter);
    }
  };

  const handleSelectPlatforms = (platform: string) => {
    const platformIsSelected = selectedPlatforms.includes(platform);
    if (!platformIsSelected) {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    } else {
      const filter = selectedPlatforms.filter((g) => g !== platform);
      setSelectedPlatforms(filter);
    }
  };

  const clearFilters = () => {
    setSelectedGenres([]);
    setSelectedPlatforms([]);
  };

  // React.useEffect(() => {
  //   if (!filters.genres) {
  //     setSelectedGenres([]);
  //   }
  //   if (!filters.platforms) {
  //     setSelectedPlatforms([]);
  //   }
  // }, [filters.genres, filters.platforms]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="purple"
          className="h-full rounded-2xl md:w-auto w-full"
        >
          <ListFilter />
          {t('title')}
          {selectedGenres.length > 0 && (
            <Badge
              variant="warning"
              className="rounded-full -5 min-w-5 font-mono tabular-nums px-1  text-white"
            >
              {selectedGenres.length + selectedPlatforms.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 h-auto max-h-[500px] overflow-auto">
          <section className="space-y-2">
            <h3 className="text-sm font-medium">{t('genres')}</h3>
            <Separator />
            <div className="flex flex-wrap gap-2  p-4 rounded-xl">
              {allGenresSorted.map((genre: GenreFilters) => (
                <Button
                  key={genre.slug}
                  variant="purple"
                  size="sm"
                  onClick={() => handleSelectGenres(genre.slug)}
                  className={`${
                    selectedGenres.includes(genre.slug)
                      ? 'bg-purple'
                      : 'bg-foreground text-background'
                  } `}
                >
                  {t(
                    genre.name === 'Massively Multiplayer'
                      ? 'massivelyMultiplayer'
                      : genre.name === 'Board Games'
                      ? 'boardGames'
                      : genre.name.toLowerCase(),
                  )}
                </Button>
              ))}
            </div>
            {/* <Separator /> */}
          </section>
          <section className="space-y-2">
            <h3 className="text-sm font-medium">{t('platforms')}</h3>
            <Separator />
            <div className="flex flex-wrap gap-2  p-4 rounded-xl">
              {allPlatformsSorted.map((platform: PlatformFilters) => (
                <Button
                  key={platform.slug}
                  variant="purple"
                  size="sm"
                  onClick={() => handleSelectPlatforms(platform.id)}
                  className={`${
                    selectedPlatforms.includes(platform.id)
                      ? 'bg-purple'
                      : 'bg-foreground text-background'
                  } `}
                >
                  {platform.name}
                </Button>
              ))}
            </div>
          </section>
        </div>
        <DialogFooter className="mt-4 shrink-0">
          <Button variant="outline" type="button" onClick={clearFilters}>
            {t('clear')}
          </Button>

          <Button
            onClick={() => {
              handleClick();
              setOpen(false);
            }}
          >
            {t('apply')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
