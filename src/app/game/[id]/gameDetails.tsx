'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, ChevronRightIcon, Star } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';
import CustomTab from '@/components/tabs/CustomTab';
import { Badge } from '@/components/ui/badge';
import { FormatDate } from '@/utils/formatDate';
import getLabelByPlatform from '@/utils/getLabelByPlatform';

export default function GameDetails({ game, descriptionTranslated, editGame }) {
  const {
    name,
    metacritic,
    genres,
    platforms,
    rating,
    background_image,
    released,
    achievements_count,
    screenshots_count,
    movies_count,
  } = game || {};

  const {
    notes,
    progress: myProgress,
    rating: myRating,
    platform,
    isFavorite,
    status: myStatus,
    createdAt,
  } = editGame || {};

  const t = useTranslations('gameDetails');
  const l = useTranslations('library');
  const router = useRouter();
  const searchParams = useSearchParams();
  const showItem = searchParams.get('from');

  if (!game) return <div>Jogo não encontrado.</div>;

  function handleBackClick() {
    router.back();
  }

  const breadcrumbs = !showItem
    ? [
        { text: t('gallery'), href: '/' },
        { text: name, href: '' },
      ]
    : [
        { text: t('gallery'), href: '/' },
        { text: t('library'), href: '/my-library' },
        { text: name, href: '' },
      ];

  const getLabelByStatus = (status: string) => {
    switch (status) {
      case 'wishlist':
        return l('wishlist');
        break;
      case 'playing':
        return l('playing');
        break;
      case 'completed':
        return l('completed');
        break;
      case 'dropped':
        return l('dropped');
        break;
      default:
        return null;
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1200px] mx-auto mt-4">
        <Button
          onClick={handleBackClick}
          variant="ghost"
          size="sm"
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('back')}</span>
        </Button>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 pt-6 flex items-center gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((item, index) => {
              const isLast = index === breadcrumbs.length - 1;

              return (
                <BreadcrumbItem key={item.text}>
                  {isLast ? (
                    <BreadcrumbPage>{item.text}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href}
                        className=" text-sm text-muted-foreground"
                      >
                        {item.text}
                      </Link>
                    </BreadcrumbLink>
                  )}

                  {!isLast && <ChevronRightIcon className="w-4 h-4" />}
                </BreadcrumbItem>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div
          className={`bg-card border rounded-xl shadow-sm overflow-hidden ${
            showItem
              ? 'md:grid md:gap-6 md:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]'
              : ''
          }`}
        >
          <div className={`p-6 space-y-4 ${!showItem ? 'w-full' : ''}`}>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="md:w-1/3">
                <div
                  className={`relative w-full ${
                    showItem ? 'aspect-3/4' : 'aspect-4/3'
                  } overflow-hidden rounded-lg`}
                >
                  <Image
                    src={background_image || '/no-image-available.png'}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h1 className="text-2xl font-semibold leading-tight flex items-center gap-4">
                      {name}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                      {released ? new Date(released).getFullYear() : 'Sem data'}{' '}
                      · {genres?.map((g) => g.name).join(', ') || 'Sem gênero'}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs uppercase text-muted-foreground">
                      Metacritic
                    </span>
                    <Badge
                      className={`mt-1 inline-flex items-center justify-center rounded-full border px-4 py-1 text-sm font-semibold ${
                        metacritic >= 75
                          ? 'bg-green-500 text-white border-green-600'
                          : metacritic >= 50
                          ? 'bg-orange-400 text-black border-orange-500'
                          : 'bg-red-500 text-white border-red-600'
                      }`}
                    >
                      {metacritic || 'N/A'}
                    </Badge>
                  </div>
                </div>

                {showItem && (
                  <div className="flex flex-wrap items-center gap-2">
                    {myStatus !== 'completed' && (
                      <Button size="sm" className="rounded-full">
                        {myStatus === 'wishlist'
                          ? t('start')
                          : myStatus === 'paused' || myStatus === 'dropped'
                          ? t('resume')
                          : t('pause')}
                      </Button>
                    )}
                    {myStatus !== 'completed' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                      >
                        <Check />
                        {t('finished')}
                      </Button>
                    )}
                    {!isFavorite && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                      >
                        <Star />
                        {t('favorite')}
                      </Button>
                    )}
                    {isFavorite && <Star className="w-6 h-6 text-yellow-500" />}
                  </div>
                )}
                {!showItem && (
                  <Button size="sm" variant="success" className="rounded-full">
                    Adicionar a biblioteca
                  </Button>
                )}

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground ">
                    Single-player
                  </span>
                  <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                    {rating ? `Rating ${rating}` : 'Sem rating'}
                  </span>
                  <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                    {platforms?.map((p) => p.platform.name).join(', ') ||
                      'Plataformas indefinidas'}
                  </span>
                </div>
              </div>
            </div>

            <CustomTab
              descriptionTranslated={descriptionTranslated}
              gameId={game.id}
              platforms={platforms}
              screenshotsCount={screenshots_count}
              achievementsCount={achievements_count}
              moviesCount={movies_count}
            />
          </div>
          {showItem && (
            <aside className="border-l bg-muted/40 p-6 space-y-4 text-sm">
              <div>
                <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                  {t('gameDetails')}
                </h3>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span>{getLabelByStatus(myStatus)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {l('progress')}
                    </span>
                    <span>{myProgress}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('added')}</span>
                    <span>{FormatDate(createdAt) || 'Data desconhecida'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {t('myRating')}
                    </span>
                    <span>{myRating}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                  {t('mods')}
                </h3>
                <p>
                  {getLabelByPlatform(platform) ??
                    'Sem plataformas cadastradas'}
                </p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                  {t('personalNotes')}
                </h3>
                <p
                  className={`text-md text-foreground ${
                    !notes && 'text-muted-foreground'
                  }`}
                >
                  {notes || t('notesDefault')}
                </p>
              </div>

              <Button
                variant="default"
                size="sm"
                className="w-full mt-2 text-white"
              >
                {t('edit')}
              </Button>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
