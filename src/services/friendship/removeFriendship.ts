'use server';

import { authOptions } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

export async function removeFriendship(friendshipId: string): Promise<void> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error('No session found');

  const userId = session.user.id;
  const supabase = createSupabaseServerClient();

  const { error } = await supabase
    .from('friendships')
    .delete()
    .eq('id', friendshipId)
    .or(`requester_id.eq.${userId},addressee_id.eq.${userId}`);

  if (error) throw error;

  revalidatePath('/friendlist');
}
