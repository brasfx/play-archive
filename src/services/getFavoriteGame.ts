import { createSupabaseServerClient } from '@/lib/supabase/server';

interface Profile {
  id?: string;
}

export async function getFavoriteGame(id: string): Promise<Profile | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Erro select profile:', error);
    return null;
  }

  return data;
}
