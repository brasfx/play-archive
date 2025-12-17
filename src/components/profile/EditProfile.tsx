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
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '../ui/spinner';
import { toast } from 'react-toastify';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Edit } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

  const {
    handleSubmit,
    control,
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
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] flex max-h-[95vh] flex-col overflow-hidden">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col"
        >
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur
            </DialogDescription>
          </DialogHeader>
          <div>
            <Field className="w-full">
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <div className="mt-1">
                <Input
                  id="nickname"
                  type="text"
                  {...register('nickname')}
                  className="border-foreground"
                />
              </div>
            </Field>
            <Field className="w-full">
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <div className="mt-1">
                <Input
                  id="bio"
                  type="text"
                  {...register('bio')}
                  className="border-foreground"
                />
              </div>
            </Field>
            <Field className="w-full">
              <FieldLabel htmlFor="favoriteGames">Favorite Games</FieldLabel>
              <div className="mt-1">
                <Input
                  id="favoriteGames"
                  type="text"
                  {...register('favoriteGames')}
                  className="border-foreground"
                />
              </div>
            </Field>
            <Field className="w-full">
              <FieldLabel htmlFor="favoritePlatforms">
                Favorite Platforms
              </FieldLabel>
              <div className="mt-1">
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
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
