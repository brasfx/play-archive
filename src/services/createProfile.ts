import { createSupabaseServerClient } from '@/lib/supabase/server';

interface Data {
  id: string;
  email: string;
  avatar_url: string;
  name: string;
  provider: string;
}

export async function createProfile({
  id,
  email,
  avatar_url,
  name,
  provider,
}: Data) {
  const supabase = createSupabaseServerClient();

  const { error } = await supabase.from('profiles').insert({
    id,
    email,
    avatar_url,
    name,
    provider,
  });

  if (error) {
    console.error('Erro ao criar perfil:', error);
    return null;
  }

  return { id, email, avatar_url, name, provider };
}
