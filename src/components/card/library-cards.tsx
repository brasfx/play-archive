'use client';

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
}

export function LibraryCards({ games }: GamesProps) {
  console.log(games);
  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <h1>Minha biblioteca</h1>
        {games.map((game) => (
          <div key={game.id} className="border-b border-gray-600 py-2">
            <p>Game ID: {game.gameId}</p>
            <p>Status: {game.status}</p>
            <p>Rating: {game.rating ?? 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
