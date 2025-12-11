'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from '../ui/dialog';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import Image from 'next/image';
import noImage from '@/assets/images/no-image.jpg';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner } from '../ui/spinner';

type StatusLabels = {
  wishlist: string;
  playing: string;
  completed: string;
  dropped: string;
  details?: string;
  edit?: string;
  confirm?: string;
  cancel?: string;
  deleteTitle?: string;
  deleteMessage?: string;
};

interface GameProps {
  game: {
    name?: string;
    backgroundImage?: string | null;
    id?: string;
    userId?: string;
    createdAt?: string;
    gameId?: number;
    isFavorite?: boolean;
    notes?: string | number | null;
    progress: number;
    rating?: number | null;
    status?: string;
    platform?: string;
  };
  labels?: StatusLabels;
}

const formSchema = z.object({
  status: z
    .enum(['wishlist', 'playing', 'completed', 'dropped'])
    .optional()
    .nullable()
    .transform((val) => (val ?? undefined) as string | undefined),
  platform: z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
  progress: z.number().min(0).max(100).optional(),
  rating: z.number().min(1).max(10).optional(),
  favorite: z.boolean().optional(),
  notes: z
    .string()
    .optional()
    .transform((val) => (val === '' ? undefined : val)),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditGame({ labels, game }: GameProps) {
  const router = useRouter();

  const {
    handleSubmit,
    control,
    register,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      status: (['wishlist', 'playing', 'completed', 'dropped'] as const)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .includes(game?.status as any)
        ? (game.status as FormValues['status'])
        : 'wishlist',
      platform: game?.platform || '',
      progress: game?.progress ?? 0,
      rating: game?.rating ?? 1,
      favorite: !!game?.isFavorite,
      notes: game?.notes ? String(game?.notes) : '',
    },
  });

  async function onSubmit(data: FormValues) {
    console.log('Submitting data:', data);
    try {
      await fetch('/api/library', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id_rawg: game?.gameId,
          status: data.status,
          rating: data.rating,
          notes: data.notes,
          progress_percent: data.progress,
          is_favorite: data.favorite,
          platform: data.platform,
        }),
      });
      toast.success('Jogo atualizado na sua biblioteca!');
    } catch (error) {
      console.error('Erro ao atualizar o jogo:', error);
      toast.error('Erro ao atualizar o jogo da biblioteca.');
    } finally {
      router.refresh();
      setOpen(false);
    }
  }

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2"
          variant="default"
          type="button"
        >
          {labels?.edit}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit game</DialogTitle>
            <DialogDescription>
              {`Make changes to your game "${game?.name}"`}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <Image
              loading="eager"
              src={game?.backgroundImage ? `${game?.backgroundImage}` : noImage}
              alt="game cover"
              width={400}
              height={225}
              className="rounded-md"
            />

            <Field className="w-full">
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <div className="mt-1">
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={labels?.wishlist} />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-foreground">
                        <SelectItem value="wishlist">
                          {labels?.wishlist ?? 'Wishlist'}
                        </SelectItem>
                        <SelectItem value="playing">
                          {labels?.playing ?? 'Playing'}
                        </SelectItem>
                        <SelectItem value="completed">
                          {labels?.completed ?? 'Completed'}
                        </SelectItem>
                        <SelectItem value="dropped">
                          {labels?.dropped ?? 'Dropped'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </Field>
            <Field className="w-full">
              <FieldLabel htmlFor="platform">Platform</FieldLabel>
              <div className="mt-1">
                <Controller
                  control={control}
                  name="platform"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent className="bg-background text-foreground">
                        <SelectItem value="pc">PC</SelectItem>
                        <SelectItem value="ps">PlayStation</SelectItem>
                        <SelectItem value="xbox">Xbox</SelectItem>
                        <SelectItem value="switch">Nintendo Switch</SelectItem>
                        <SelectItem value="mobile">Mobile</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </Field>
            <Field className="w-full">
              <FieldLabel htmlFor="progress">Progress (%)</FieldLabel>
              <div className="mt-1">
                <Controller
                  control={control}
                  name="progress"
                  render={({ field }) => (
                    <Field
                      className="flex flex-row items-center gap-4"
                      orientation="horizontal"
                    >
                      <Input
                        className="w-full"
                        id="progress"
                        type="range"
                        min={0}
                        max={100}
                        step={5}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <FieldLabel htmlFor="progress">{field.value}%</FieldLabel>
                    </Field>
                  )}
                />
              </div>
            </Field>
            <Field className="w-full">
              <FieldLabel htmlFor="rating">Rating (1-10)</FieldLabel>
              <div className="mt-1">
                <Controller
                  control={control}
                  name="rating"
                  render={({ field }) => (
                    <Field
                      className="flex flex-row items-center gap-4"
                      orientation="horizontal"
                    >
                      <Input
                        className="w-full"
                        id="rating"
                        type="range"
                        min={1}
                        max={10}
                        step={1}
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                      <FieldLabel htmlFor="rating">{field.value}</FieldLabel>
                    </Field>
                  )}
                />
              </div>
            </Field>
            <Field className="w-full">
              <FieldLabel htmlFor="favorite">Favorite</FieldLabel>
              <div className="mt-1">
                <Controller
                  control={control}
                  name="favorite"
                  render={({ field }) => (
                    <FieldGroup>
                      <Field orientation="horizontal">
                        <FieldSeparator />
                        <Checkbox
                          id="favorite"
                          checked={field.value}
                          onCheckedChange={(checked) =>
                            field.onChange(!!checked)
                          }
                        />
                        <FieldLabel>
                          <Label htmlFor="favorite">
                            Esse é meu jogo favorito
                          </Label>
                        </FieldLabel>
                      </Field>
                    </FieldGroup>
                  )}
                />
              </div>
            </Field>
            <Field className="w-full">
              <FieldLabel htmlFor="notes">Notes</FieldLabel>
              <div className="mt-1">
                <Input id="notes" type="text" {...register('notes')} />
              </div>
            </Field>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Spinner /> : 'Save changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
