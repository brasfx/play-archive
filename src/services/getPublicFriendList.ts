import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getPublicFriendList(userId: string) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('friendships')
    .select(
      `
      id, created_at, status, requester_id, addressee_id,
      requester:profiles!friendships_requester_id_fkey(id, name, nickname, avatar_url, public_id),
      addressee:profiles!friendships_addressee_id_fkey(id, name, nickname, avatar_url, public_id)
    `,
    )
    .eq('status', 'accepted')
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) return null;

  return (data ?? []).map((f) => ({
    friendshipId: f.id,
    friend: f.requester_id === userId ? f.addressee : f.requester,
  }));
}
