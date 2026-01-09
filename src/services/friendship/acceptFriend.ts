import { Friendship } from '@/types/friendship';
import { authOptions } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function acceptFriendRequest(
  friendshipId: string,
): Promise<Friendship> {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('No session found');
  }

  const userId = session.user.id;

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('friendships')
    .update({ status: 'accepted', responded_at: new Date().toISOString() })
    .eq('id', friendshipId)
    .eq('addressee_id', userId)
    .eq('status', 'pending')
    .select()
    .single<Friendship>();

  if (error) throw error;

  revalidatePath('/friendlist');

  return data;
}
