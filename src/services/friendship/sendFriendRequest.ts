'use server';

import { authOptions } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import type { Friendship } from '@/types/friendship';

type SendFriendRequestParams = {
  value: string;
};

export async function sendFriendRequest({
  value,
}: SendFriendRequestParams): Promise<Friendship> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('No session found');

  const requesterId = session.user.id;
  const q = value.trim();
  if (!q) throw new Error('Informe um nickname ou public id.');

  const supabase = createSupabaseServerClient();

  //(public_id exato ou nickname case-insensitive)
  const { data: addressee, error: addresseeError } = await supabase
    .from('profiles')
    .select('id')
    .or(`public_id.eq.${q},nickname.ilike.${q}`)
    .maybeSingle();

  if (addresseeError) throw addresseeError;
  if (!addressee) throw new Error('Usuário não encontrado.');

  const addresseeId = addressee.id;

  if (requesterId === addresseeId) {
    throw new Error('Você não pode adicionar a si mesmo.');
  }

  //verificar se já existe relação (qualquer direção)
  const { data: existing, error: existingError } = await supabase
    .from('friendships')
    .select('id, status, requester_id, addressee_id')
    .or(
      `and(requester_id.eq.${requesterId},addressee_id.eq.${addresseeId}),` +
        `and(requester_id.eq.${addresseeId},addressee_id.eq.${requesterId})`,
    )
    .maybeSingle();

  if (existingError) throw existingError;

  if (existing) {
    if (existing.status === 'accepted') throw new Error('Vocês já são amigos.');

    if (existing.status === 'blocked') {
      throw new Error('Não é possível enviar convite: relação bloqueada.');
    }

    const isInversePending =
      existing.status === 'pending' && existing.addressee_id === requesterId;

    if (isInversePending) {
      const { data, error } = await supabase
        .from('friendships')
        .update({ status: 'accepted', responded_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single<Friendship>();

      if (error) throw error;

      revalidatePath('/friendlist');
      return data;
    }

    throw new Error('Já existe uma solicitação pendente entre esses usuários.');
  }

  const { data, error } = await supabase
    .from('friendships')
    .insert({
      requester_id: requesterId,
      addressee_id: addresseeId,
      status: 'pending',
    })
    .select()
    .single<Friendship>();

  if (error) throw error;

  revalidatePath('/friendlist');
  return data;
}
