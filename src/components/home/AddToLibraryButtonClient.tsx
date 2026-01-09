'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useSession, signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import type { Genre } from '@/types/rawg';

type AddGameInput = {
  id: number;
  background_image: string | null;
  name: string;
  slug: string;
  released: string | null;
  genres?: Genre[];
};

export default function AddToLibraryButtonClient({
  game,
  label,
}: {
  game: AddGameInput;
  label: string;
}) {
  const { status } = useSession();
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    setLoading(true);
    const genreNames = game.genres?.map((g) => g.name) || [];

    try {
      if (status !== 'authenticated') {
        signIn();
        return;
      }

      const res = await fetch('/api/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id_rawg: game.id,
          background_image: game.background_image,
          name: game.name,
          slug: game.slug,
          released: game.released,
          genres: genreNames,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);

        if (res.status === 409)
          toast.info('Esse jogo já está na sua biblioteca');
        else {
          console.error(
            'Erro ao adicionar jogo à biblioteca:',
            data?.error || res.statusText,
          );
          toast.error('Erro ao adicionar jogo à biblioteca');
        }
        return;
      }

      toast.success('Jogo adicionado à biblioteca com sucesso!');
    } catch (e) {
      console.error('Erro ao adicionar jogo à biblioteca:', e);
      toast.error('Erro ao adicionar jogo à biblioteca');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      className="flex items-center gap-2"
      variant="default"
      aria-label={label}
      onClick={handleAdd}
      disabled={loading}
    >
      {loading ? <Spinner /> : label}
    </Button>
  );
}
