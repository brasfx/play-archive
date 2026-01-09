'use client';
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Field, FieldLabel } from '../ui/field';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '../ui/spinner';
import { toast } from 'react-toastify';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { EditProfileProps } from '@/types/profile';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface ProfileProps {
  nickname: string;
  bio: string;
  favoriteGameName: string;
  favoriteGameId: number | null;
  favoriteGameImage: string;
  favoriteGameProgress: number;
  favoriteGameRating: number;
  favoritePlatforms: string;
}

const formSchema = z.object({
  nickname: z.string().optional(),
  bio: z.string().optional(),
  favoriteGameName: z.string().optional(),
  favoriteGameId: z.string().optional(),
  favoriteGameImage: z.string().optional(),
  favoriteGameProgress: z.number().optional(),
  favoriteGameRating: z.number().optional(),
  favoritePlatforms: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function EditProfile({
  nickname,
  bio,
  favoriteGameName,
  favoriteGameId,
  favoriteGameImage,
  favoriteGameProgress,
  favoriteGameRating,
  favoritePlatforms,
}: ProfileProps) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations('profile');
  const [library, setLibrary] = useState<EditProfileProps[]>([]);
  const [isLoadingLibrary, setIsLoadingLibrary] = useState(false);
  console.log('library', library);

  useEffect(() => {
    if (!open) return;
    if (library.length) return;

    let cancelled = false;

    (async () => {
      setIsLoadingLibrary(true);
      try {
        const res = await fetch('/api/library', { method: 'GET' });
        if (!res.ok) throw new Error('Failed to fetch library');
        const data = (await res.json()) as EditProfileProps[];
        if (!cancelled) setLibrary(data);
      } finally {
        if (!cancelled) setIsLoadingLibrary(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, library.length]);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: nickname || '',
      bio: bio || '',
      favoriteGameName: favoriteGameName || '',
      favoriteGameId: favoriteGameId !== null ? String(favoriteGameId) : '',
      favoriteGameProgress: favoriteGameProgress || null,
      favoriteGameRating: favoriteGameRating || null,
      favoriteGameImage: favoriteGameImage || '',
      favoritePlatforms: favoritePlatforms || '',
    },
  });

  console.log(favoriteGameId);

  async function onSubmit(data: FormValues) {
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: data.nickname,
          bio: data.bio,
          favorite_game_name: data.favoriteGameName,
          favorite_game_id_rawg: data.favoriteGameId,
          favorite_game_image: data.favoriteGameImage,
          favorite_game_progress: data.favoriteGameProgress,
          favorite_game_rating: data.favoriteGameRating,
          favorite_platform: data.favoritePlatforms,
        }),
      });
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      toast.error('Erro ao atualizar o perfil.');
    } finally {
      setOpen(false);
      router.refresh();
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full sm:w-40 text-foreground bg-background rounded-full"
          variant="ghost"
        >
          <Edit />
          {t('edit')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex max-h-[95vh] flex-col overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>{t('title')}</DialogTitle>
            <DialogDescription>{t('subtitle')}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <Field className="w-full">
              <div className="mt-2">
                <FieldLabel htmlFor="name" className="mb-1">
                  {t('nickname')}
                </FieldLabel>
                <Input
                  id="nickname"
                  type="text"
                  {...register('nickname')}
                  className="border-foreground"
                />
              </div>
            </Field>
            <Field className="w-full">
              <div className="mt-2">
                <FieldLabel htmlFor="bio" className="mb-1">
                  {t('bio')}
                </FieldLabel>
                <Input
                  id="bio"
                  type="text"
                  {...register('bio')}
                  className="border-foreground"
                />
              </div>
            </Field>
            <Field className="w-full">
              <div className="mt-2">
                <FieldLabel htmlFor="favoriteGames" className="mb-1">
                  {t('favoriteGames')}
                </FieldLabel>

                <Controller
                  name="favoriteGameId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? ''}
                      onValueChange={(rawgId) => {
                        field.onChange(rawgId);

                        const selected = library.find(
                          (g) => String(g.game_id_rawg) === String(rawgId),
                        );
                        console.log(selected);
                        console.log(rawgId);
                        setValue('favoriteGameName', selected?.name ?? '');
                        setValue(
                          'favoriteGameImage',
                          selected?.background_image ?? '',
                        );
                        setValue(
                          'favoriteGameProgress',
                          selected?.progress_percent ?? 0,
                        );
                        setValue('favoriteGameRating', selected?.rating ?? 0);
                      }}
                    >
                      <SelectTrigger
                        id="favoriteGameId"
                        className="border-foreground w-full"
                      >
                        <SelectValue
                          className="text-white"
                          placeholder="Selecione seu jogo favorito"
                        />
                      </SelectTrigger>

                      <SelectContent className="bg-foreground dark:bg-background text-white">
                        {library.map((game) => (
                          <SelectItem
                            key={game.game_id_rawg}
                            value={String(game.game_id_rawg)}
                            disabled={!game.name}
                          >
                            {game.name ?? 'Sem nome'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </Field>
            <Field className="w-full">
              <div className="mt-2">
                <FieldLabel htmlFor="favoritePlatforms" className="mb-1">
                  {t('favoritePlatforms')}
                </FieldLabel>
                <Input
                  id="favoritePlatforms"
                  type="text"
                  {...register('favoritePlatforms')}
                  className="border-foreground"
                />
              </div>
            </Field>
          </div>
          <DialogFooter className="mt-4 shrink-0">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : t('saveChanges')}
            </Button>
          </DialogFooter>
          <input type="hidden" {...register('favoriteGameName')} />
          <input type="hidden" {...register('favoriteGameImage')} />
          <input type="hidden" {...register('favoriteGameProgress')} />
          <input type="hidden" {...register('favoriteGameRating')} />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
