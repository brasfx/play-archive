import { createSupabaseServerClient } from '@/lib/supabase/server';

export async function getGamesCount(id: string) {
  const supabase = createSupabaseServerClient();

  const { count, error } = await supabase
    .from('library')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', id);

  if (error) throw error;

  return count ?? 0;
}
