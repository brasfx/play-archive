import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
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
  name?: string;
  slug?: string;
  backgroundImage?: string;
  released?: string;
  genres?: string[];
  platform?: string;
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
    .order('is_favorite', { ascending: false });

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
    name: game.name,
    slug: game.slug,
    backgroundImage: game.background_image,
    released: game.released,
    genres: game.genres,
    platform: game.platform,
  }));

  return games;
}
