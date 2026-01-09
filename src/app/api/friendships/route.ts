import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  const { addresseeId } = await req.json();
  const requesterId = session.user.id;
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from('friendships').insert({
    requester_id: requesterId,
    addressee_id: addresseeId,
    status: 'pending',
  });

  if (error) {
    console.error('Erro insert friendship:', error);
    return NextResponse.json(
      { error: 'Erro ao adicionar amizade' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: 'Amizade adicionada com sucesso',
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  const { friendshipId, status } = await req.json();
  const requesterId = session.user.id;
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('friendships')
    .update({ status: status })
    .eq('id', friendshipId)
    .eq('addressee_id', requesterId) // garante que só o destinatário aceite
    .eq('status', 'pending')
    .select('id, status, requester_id, addressee_id')
    .single();

  if (error) {
    console.error('Erro update friendship:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar amizade' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: data,
  });
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  const { friendshipId } = await req.json();
  const userId = session.user.id;

  const supabase = createSupabaseServerClient();

  const { error } = await supabase
    .from('friendships')
    .delete()
    .eq('id', friendshipId)
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);

  if (error) {
    console.error('Erro delete friendship:', error);
    return NextResponse.json(
      { error: 'Erro ao remover amizade' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: 'Amizade removida com sucesso',
  });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }
  const { userId } = await req.json();
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('friendships')
    .select('*')
    .eq('addressee_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erro select friendships:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar amizades' },
      { status: 500 },
    );
  }
  return NextResponse.json(data);
}
