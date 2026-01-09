import { authOptions } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const {
    nickname,
    bio,
    favorite_game_name,
    favorite_game_image,
    favorite_game_id_rawg,
    favorite_platform,
    favorite_game_progress,
    favorite_game_rating,
    bg_id,
  } = await req.json();

  const clean = (v: unknown) =>
    typeof v === 'string' && v.trim() === '' ? null : v;

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const supabase = createSupabaseServerClient();

  const { error } = await supabase
    .from('profiles')
    .update({
      nickname: clean(nickname),
      bio: clean(bio),
      favorite_game_name: clean(favorite_game_name),
      favorite_game_image: clean(favorite_game_image),
      favorite_game_id_rawg: clean(favorite_game_id_rawg),
      favorite_game_progress: clean(favorite_game_progress),
      favorite_game_rating: clean(favorite_game_rating),
      favorite_platform: clean(favorite_platform),
      bg_id: clean(bg_id),
      updated_at: new Date().toISOString(),
    })
    .eq('id', session.user.id);

  if (error) {
    console.error('Erro update profile:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar perfil' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: 'Perfil atualizado com sucesso',
  });
}
