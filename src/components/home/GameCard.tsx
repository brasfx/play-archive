import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormatYear } from '@/utils/formatDate';
import type { RawgGame, Genre, ParentPlatform } from '@/types/rawg';
import noImage from '@/assets/images/no-image.jpg';
import AddToLibraryButtonClient from './AddToLibraryButtonClient';

import { ShineBorder } from '@/components/ui/shine-border';
import { Disc3 } from '@/components/animate-ui/icons/disc-3';
import { Star } from '@/components/animate-ui/icons/star';

// import { ShineBorder, Star, Disc3 } from './EffectsClient';

const Priority = {
  High: 'high',
  Low: 'low',
} as const;

export default function GameCard({
  game,
  index,
  addButtonLabel,
  detaislButtonLabel,
}: {
  game: RawgGame;
  index: number;
  addButtonLabel: string;
  detaislButtonLabel: string;
}) {
  const {
    id,
    name,
    slug,
    background_image,
    genres,
    parent_platforms,
    released,
  } = game;

  const priority = index < 13;
  const fetchPriority = index < 2 ? Priority.High : Priority.Low;

  return (
    <Card className="flex relative flex-col w-full max-w-[308px] max-h-[500px] gap-4 z-10">
      <ShineBorder key={id} shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />

      <div>
        <Image
          src={background_image ? background_image : noImage}
          alt={`This is cover of ${name}`}
          width={264}
          height={188}
          priority={priority}
          fetchPriority={fetchPriority}
          className="rounded-t-md w-full p-0.5 max-h-[188px] object-cover self-center bg-neutral-500 h-60"
        />
      </div>

      <div className="flex flex-col grow">
        <CardHeader>
          <CardTitle className="text-md font-semibold align-baseline">
            {name}
          </CardTitle>
        </CardHeader>

        <CardAction className="flex flex-wrap gap-2 px-4 mt-auto">
          {genres?.slice(0, 2)?.map(({ name }: Genre) => (
            <Badge key={name} className="gap-2 px-3 py-1.5 bg-destructive">
              {name}
            </Badge>
          ))}
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
              ?.map(({ platform }: ParentPlatform) => platform.name)
              .join(', ')}
          </div>
        </CardFooter>
      </div>

      <div className="flex w-full m-auto pl-6 gap-4 justify-baseline">
        <Link href={`/game/${id}`} className="no-underline">
          <Button variant="outline">{detaislButtonLabel}</Button>
        </Link>

        <AddToLibraryButtonClient
          game={{
            id,
            background_image,
            name,
            slug,
            released,
            genres,
          }}
          label={addButtonLabel}
        />
      </div>
    </Card>
  );
}
