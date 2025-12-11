import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const {
    game_id_rawg,
    status,
    rating,
    notes,
    progress_percent,
    is_favorite,
    name,
    slug,
    background_image,
    released,
    genres,
  } = await req.json();

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
    name,
    slug,
    background_image,
    released,
    genres: genres ?? null,
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

export async function DELETE(req: NextRequest) {
  const { game_id_rawg } = await req.json();
  if (!game_id_rawg) {
    return NextResponse.json(
      { error: 'game_id_rawg é obrigatório' },
      { status: 400 },
    );
  }
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('library')
    .delete()
    .eq('game_id_rawg', game_id_rawg)
    .eq('user_id', session.user.id)
    .select();

  if (error) {
    console.error('Erro delete library:', error);
    return NextResponse.json(
      { error: 'Erro ao remover jogo da biblioteca' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, message: data });
}

export async function PATCH(req: NextRequest) {
  const {
    game_id_rawg,
    status,
    rating,
    notes,
    progress_percent,
    is_favorite,
    platform,
  } = await req.json();

  if (!game_id_rawg) {
    return NextResponse.json(
      { error: 'game_id_rawg é obrigatório' },
      { status: 400 },
    );
  }

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const supabase = createSupabaseServerClient();

  const { error } = await supabase
    .from('library')
    .update({
      status,
      rating,
      notes,
      progress_percent,
      is_favorite,
      platform,
    })
    .eq('game_id_rawg', game_id_rawg)
    .eq('user_id', session.user.id);

  if (error) {
    console.error('Erro update library:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar jogo da biblioteca' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: 'Jogo atualizado com sucesso',
  });
}
