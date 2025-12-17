'use client';
import React, { useState } from 'react';
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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '../ui/spinner';
import { toast } from 'react-toastify';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface ProfileProps {
  nickname: string;
  bio: string;
  favoriteGames: string;
  favoritePlatforms: string;
}

const formSchema = z.object({
  nickname: z.string().optional(),
  bio: z.string().optional(),
  favoriteGames: z.string().optional(),
  favoritePlatforms: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

function EditProfile({
  nickname,
  bio,
  favoriteGames,
  favoritePlatforms,
}: ProfileProps) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations('profile');

  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: nickname || '',
      bio: bio || '',
      favoriteGames: favoriteGames || '',
      favoritePlatforms: favoritePlatforms || '',
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nickname: data.nickname,
          bio: data.bio,
          favorite_game_name: data.favoriteGames,
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
          className="w-full sm:w-40 text-foreground bg-background"
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
                <Input
                  id="favoriteGames"
                  type="text"
                  {...register('favoriteGames')}
                  className="border-foreground"
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
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
