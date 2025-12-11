'use client';
import React, { useState } from 'react';
import { Trash } from 'lucide-react';
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '@/components/ui/badge';
import { Lens } from '../ui/lens';
import { Pointer } from '../ui/pointer';
import { ShineBorder } from '../ui/shine-border';
import { Star } from '../animate-ui/icons/star';
import { Disc3 } from '../animate-ui/icons/disc-3';
import Link from 'next/link';
import { Button } from '../ui/button';

import noImage from '@/assets/images/no-image.jpg';
import Image from 'next/image';
import { FormatYear, FormatDate } from '@/utils/formatDate';
import { RawgGame, Genre, ParentPlatform } from '@/types/rawg';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { Progress } from '../ui/progress';
import { Library } from '@/types/library';
import { DeleteGame } from '../library/deleteGame';
import EditGame from '../library/editGame';
import { CirclePlus } from '../animate-ui/icons/circle-plus';

type StatusLabels = {
  wishlist: string;
  playing: string;
  completed: string;
  dropped: string;
  details?: string;
  edit?: string;
  confirm?: string;
  cancel?: string;
  deleteTitle?: string;
  deleteMessage?: string;
};

interface GamesProps {
  games: {
    id: string;
    userId: string;
    createdAt: string;
    gameId: number;
    isFavorite: boolean;
    notes: string | number | null;
    progress: number;
    rating: number | null;
    status: string;
  }[];
  labels?: StatusLabels;
}
interface Labels {
  title: string;
  message: string;
  cancel: string;
  confirm: string;
}

export function LibraryCards({ games, labels }: GamesProps) {
  const router = useRouter();
  const [requestInProgress, setRequestInProgress] = useState(false);

  async function deleteGame(id: string) {
    setRequestInProgress(true);
    try {
      await fetch('/api/library', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ game_id_rawg: id }),
      });
      toast.success('Jogo deletado da sua biblioteca!');
    } catch (error) {
      console.error('Erro ao deletar o jogo:', error);
      toast.error('Erro ao deletar o jogo da biblioteca.');
    } finally {
      setRequestInProgress(false);
      router.refresh();
    }
  }

  function parseGenres(genres: string): string[] {
    const parsed = JSON.parse(genres);
    parsed.slice(0, 2);
    return parsed;
  }

  function getLabelByStatus(status: string) {
    switch (status) {
      case 'wishlist':
        return (
          <Badge className="top-2 right-2 px-3 py-1 bg-blue-600 text-white">
            {labels?.wishlist || 'Wishlist'}
          </Badge>
        );
      case 'playing':
        return (
          <Badge className="top-2 right-2 px-3 py-1 bg-yellow-600 text-white">
            {labels?.playing || 'Playing'}
          </Badge>
        );
      case 'completed':
        return (
          <Badge className="top-2 pl-3 px-3 py-1 bg-green-600 text-white">
            {labels?.completed || 'Completed'}
          </Badge>
        );
      case 'dropped':
        return (
          <Badge className="top-2 right-2 px-3 py-1 right bg-red-600 text-white">
            {labels?.dropped || 'Dropped'}
          </Badge>
        );
      default:
        return null;
    }
  }

  function getLabelByPlatform(platform: string) {
    switch (platform) {
      case 'pc':
        return 'PC';
      case 'ps':
        return 'PlayStation';
      case 'xbox':
        return 'Xbox';
      case 'switch':
        return 'Nintendo Switch';
      case 'mobile':
        return 'Mobile';
      default:
        return platform;
    }
  }
  return (
    <div className="max-w-[1400px] mx-auto px-4 lg:px-6 z-10 py-4 md:py-6">
      {games.length === 0 && (
        <div className="text-center text-muted-foreground mt-20">
          Nenhum jogo na sua biblioteca. Adicione alguns!
        </div>
      )}
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-6 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2  @5xl/main:grid-cols-4">
        {games?.map(
          ({
            id,
            gameId,
            userId,
            createdAt,
            isFavorite,
            notes,
            rating,
            name,
            slug,
            backgroundImage,
            genres,
            platform,
            released,
            progress,
            status,
          }: Library) => (
            <Card
              key={id}
              className="flex relative flex-col w-full max-w-[308px] max-h-[500px] gap-4 z-10"
            >
              <ShineBorder
                key={id}
                shineColor={
                  isFavorite
                    ? ['#07e969', '#18b960', '#89ffd8', '#77b88e', '#C0FFCC']
                    : ['#ffffff', '#1f1e1ef4', '#000000']
                }
              />
              <div>
                <Lens lensSize={150} isStatic={false} ariaLabel="Zoom Area">
                  <Image
                    loading="eager"
                    src={backgroundImage ? `${backgroundImage}` : noImage}
                    alt={slug}
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
                  {parseGenres(genres)?.map((item, index) => {
                    return (
                      <Badge
                        key={index}
                        className="gap-2 px-3 py-1.5 bg-destructive"
                      >
                        {item}
                      </Badge>
                    );
                  })}
                </CardAction>
                <CardFooter className="flex-col items-start mt-4 text-muted-foreground text-sm">
                  {released && (
                    <div className="flex items-center gap-1">
                      <CirclePlus animateOnHover color="#f44af3" width={20} />{' '}
                      {FormatDate(createdAt)}
                    </div>
                  )}
                  {platform && (
                    <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1 flex-wrap wrap-break-word word-break">
                      <Disc3 animateOnHover color="#744af3" width={20} />
                      {getLabelByPlatform(platform)}
                    </div>
                  )}
                </CardFooter>
              </div>
              <div className="flex flex-wrap px-4 mt-auto">
                {getLabelByStatus(status)}
              </div>

              <div className="flex flex-row w-full m-auto pl-6 gap-2 justify-baseline items-center">
                <Progress
                  value={progress}
                  className={`w-[80%] ${
                    progress === 100
                      ? '[&>div]:bg-green-500'
                      : progress < 50
                      ? '[&>div]:bg-red-500'
                      : progress > 50 && progress < 75
                      ? '[&>div]:bg-yellow-500'
                      : '[&>div]:bg-blue-500'
                  }`}
                />
                <span className="text-sm text-muted-foreground">
                  {progress}%
                </span>
              </div>

              <div className="flex w-full m-auto pl-6 gap-4 justify-baseline ">
                <Link
                  href={`/game/${gameId}`}
                  key={id}
                  className="no-underline"
                >
                  <Button variant="outline">{labels?.details}</Button>
                </Link>
                <EditGame
                  labels={labels}
                  game={
                    {
                      name,
                      backgroundImage,
                      id,
                      userId,
                      createdAt,
                      gameId,
                      isFavorite,
                      notes,
                      progress,
                      rating,
                      status,
                      platform,
                    } as any
                  }
                />
                <DeleteGame
                  gameId={gameId}
                  handleDelete={() => {
                    deleteGame(gameId);
                  }}
                  disabled={requestInProgress}
                  labels={
                    {
                      title: labels?.deleteTitle,
                      message: labels?.deleteMessage,
                      confirm: labels?.confirm,
                      cancel: labels?.cancel,
                    } as Labels
                  }
                />
              </div>
            </Card>
          ),
        )}
      </div>
    </div>
  );
}
