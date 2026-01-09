'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export async function searchProfiles(query: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('No session found');

  const userId = session.user.id;
  const q = query.trim();
  if (!q) return [];

  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('id, name, nickname, public_id, avatar_url')
    .neq('id', userId)
    .or(`nickname.ilike.%${q}%,public_id.ilike.%${q}%`)
    .limit(10);

  if (error) throw error;
  return data ?? [];
}
