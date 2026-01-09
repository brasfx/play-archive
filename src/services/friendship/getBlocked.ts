import { createSupabaseServerClient } from '@/lib/supabase/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { FriendRow } from '@/types/friendship';

export async function getBlocked() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const userId = session.user.id;
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('friendships')
    .select(
      `
      id, status, created_at, requester_id, addressee_id,
      requester:profiles!friendships_requester_id_fkey(id, name, nickname, avatar_url, public_id),
      addressee:profiles!friendships_addressee_id_fkey(id, name, nickname, avatar_url, public_id)
    `,
    )
    .eq('status', 'blocked')
    .eq('blocked_by', userId)

    .order('blocked_at', { ascending: false });

  if (error) return null;

  return (data ?? []).map((f) => {
    const friend = f.requester_id === userId ? f.addressee : f.requester;
    return {
      friendshipId: f.id,
      friend,
    };
  }) as FriendRow[];
}
