import { authOptions } from '@/lib/auth';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getServerSession } from 'next-auth';

export async function getProfile() {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('No session found');
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (error) {
    console.error('Erro select profile:', error);
    return null;
  }

  return data;
}
