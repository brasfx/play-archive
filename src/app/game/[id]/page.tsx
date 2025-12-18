/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLocale } from '@/actions/set-locale';
import { getGameById } from '@/services/rawg';
import { translateDescription } from '@/services/translateDescription';

import GameDetails from './gameDetails';
import { getLibrary } from '@/services/getLibrary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const game: any = await getGameById(id);
  const libary: any = session ? await getLibrary() : [];
  const editGame = libary.find((game) => game.gameId === Number(id));

  // const locale = (await getLocale())?.value ?? 'pt-br'; // disable for now

  // const descriptionTranslated =
  //   game.description && locale !== 'en'
  //     ? await translateDescription(game.description || '')
  //     : game.description; // disable for now

  return (
    <GameDetails
      game={game}
      descriptionTranslated={game?.description}
      editGame={editGame}
    />
  );
}
