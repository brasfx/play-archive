/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLocale } from '@/actions/set-locale';
import { getGameById } from '@/services/rawg';
import { translateDescription } from '@/services/translateDescription';

import GameDetails from './gameDetails';

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game: any = await getGameById(id);

  const locale = (await getLocale()).value;

  const descriptionTranslated =
    game.description && locale !== 'en'
      ? await translateDescription(game.description || '')
      : game.description;

  return (
    <GameDetails game={game} descriptionTranslated={descriptionTranslated} />
  );
}
