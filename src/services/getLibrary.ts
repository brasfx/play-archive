import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '../app/api/auth/[...nextauth]/route';
import { createSupabaseServerClient } from '@/lib/supabase/server';

type GamesResponse = {
  id: string;
  userId: string;
  createdAt: string;
  gameId: number;
  isFavorite: boolean;
  notes: string | number | null;
  progress: number;
  rating: number | null;
  status: string;
};

export async function getLibrary() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('library')
    .select('*')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro select library:', error);
    return [];
  }

  const games: GamesResponse[] = data.map((game) => ({
    id: game.id,
    userId: game.user_id,
    createdAt: game.created_at,
    gameId: parseInt(game.game_id_rawg, 10),
    isFavorite: game.is_favorite ?? false,
    notes: game.notes ?? null,
    progress: game.progress_percent ?? 0,
    rating: game.rating ?? null,
    status: game.status ?? 'wishlist',
  }));

  return games;
}
