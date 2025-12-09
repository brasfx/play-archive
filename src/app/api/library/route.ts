import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const { game_id_rawg, status, rating, notes, progress_percent, is_favorite } =
    await req.json();

  if (!game_id_rawg) {
    return NextResponse.json(
      { error: 'game_id_rawg é obrigatório' },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();

  await supabase.from('profiles').upsert(
    {
      id: session.user?.id,
      email: session.user.email ?? null,
    },
    { onConflict: 'id' },
  );

  const { error } = await supabase.from('library').insert({
    user_id: session.user.id,
    game_id_rawg,
    status: status ?? 'wishlist',
    rating: rating ?? null,
    notes: notes ?? null,
    progress_percent: progress_percent ?? 0,
    is_favorite: is_favorite ?? false,
  });

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json(
        { error: 'Esse jogo já está na sua biblioteca.' },
        { status: 409 },
      );
    }
    console.error('Erro insert library:', error);
    return NextResponse.json(
      { error: 'Erro ao adicionar jogo à biblioteca' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
