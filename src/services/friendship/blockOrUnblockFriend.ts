import { Friendship } from '@/types/friendship';
import { authOptions } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function blockFriendship(
  friendshipId: string,
  action: 'blocked' | 'accepted',
): Promise<Friendship> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('No session found');

  const userId = session.user.id;
  const supabase = createSupabaseServerClient();

  const updatePayload =
    action === 'blocked'
      ? {
          status: 'blocked',
          blocked_by: userId,
          blocked_at: new Date().toISOString(),
          responded_at: new Date().toISOString(),
        }
      : {
          status: 'accepted',
          responded_at: new Date().toISOString(),
          blocked_by: null,
          blocked_at: null,
        };

  let query = supabase
    .from('friendships')
    .update(updatePayload)
    .eq('id', friendshipId)
    .eq('status', action === 'blocked' ? 'accepted' : 'blocked')
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);

  if (action === 'accepted') {
    query = query.eq('blocked_by', userId);
  }

  const { data, error } = await query.select().maybeSingle<Friendship>();
  if (error) throw error;
  if (!data) throw new Error('Nada foi atualizado (regra/status não bateu).');

  revalidatePath('/friendlist');
  return data;
}
