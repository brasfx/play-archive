'use client';
import React from 'react';
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
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
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
import { platform } from 'os';

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
    name: string;
    backgroundImage: string | null;
    id: string;
    userId: string;
    createdAt: string;
    gameId: number;
    isFavorite: boolean;
    notes: string | number | null;
    progress: number;
    rating: number | null;
    status: string;
    platform: string;
  };
  labels?: StatusLabels;
}

interface Labels {
  edit: string;
  cancel: string;
  save: string;
}

type FormField =
  | {
      name: 'status';
      label: string;
      type: 'status';
      value: string;
    }
  | {
      name: 'progress' | 'rating';
      label: string;
      type: 'slider';
      value: number | string;
    }
  | {
      name: 'notes';
      label: string;
      type: 'text';
      value: string;
    }
  | {
      name: 'favorite';
      label: string;
      type: 'checkbox';
      value: boolean | string;
    }
  | {
      name: 'platform';
      label: string;
      type: 'platform';
      value: string;
    };

export default function EditGame({ labels, game }: GameProps) {
  const [formData, setFormData] = React.useState<FormField[]>([
    {
      name: 'status',
      label: 'Status',
      type: 'status',
      value: game?.status || 'wishlist',
    },
    {
      name: 'platform',
      label: 'Platform',
      type: 'platform',
      value: game?.platform || '',
    },

    {
      name: 'progress',
      label: 'Progress (%)',
      type: 'slider',
      value: game?.progress ?? 0,
    },
    {
      name: 'rating',
      label: 'Rating (1-10)',
      type: 'slider',
      value: game?.rating ?? 0,
    },
    {
      name: 'favorite',
      label: 'Favorite',
      type: 'checkbox',
      value: game?.isFavorite ? true : false,
    },
    {
      name: 'notes',
      label: 'Notes',
      type: 'text',
      value: game?.notes ? String(game?.notes) : '',
    },
  ]);


  const router = useRouter();


  async function updateGame() {
    try {
      await fetch('/api/library', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          game_id_rawg: game?.gameId,
          status: formData.find((f) => f.name === 'status')?.value,
          rating: formData.find((f) => f.name === 'rating')?.value,
          notes: formData.find((f) => f.name === 'notes')?.value,
          progress_percent: formData.find((f) => f.name === 'progress')?.value,
          is_favorite: formData.find((f) => f.name === 'favorite')?.value,
          platform: formData.find((f) => f.name === 'platform')?.value,
        }),
      });
      toast.success('Jogo atualizado na sua biblioteca!');
    } catch (error) {
      console.error('Erro ao atualizar o jogo:', error);
      toast.error('Erro ao atualizar o jogo da biblioteca.');
    } finally {
      router.refresh();
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="flex items-center gap-2"
            variant="default"
            onClick={() => {}}
          >
            {labels?.edit}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
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
            {formData.map((field) => (
              <Field key={field.name} className="w-full">
                <FieldLabel htmlFor={field.name}>{field.label}</FieldLabel>
                <div className="mt-1">
                  {field.type === 'status' ? (
                    <Select
                      value={field.value}
                      onValueChange={(value: any) => {
                        setFormData((prev) =>
                          prev.map((item) =>
                            item.name === field.name
                              ? { ...item, value }
                              : item,
                          ),
                        );
                      }}
                    >
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
                  ) : field.type === 'platform' ? (
                    <Select
                      value={field.value}
                      onValueChange={(value: any) => {
                        setFormData((prev) =>
                          prev.map((item) =>
                            item.name === field.name
                              ? { ...item, value }
                              : item,
                          ),
                        );
                      }}
                    >
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
                  ) : field.type === 'checkbox' ? (
                    <FieldGroup>
                      <Field orientation="horizontal">
                        <FieldSeparator />
                        <Checkbox
                          id={field.name}
                          checked={field.value === true}
                          onCheckedChange={(checked: boolean) => {
                            const value = checked ? true : false;
                            setFormData((prev) =>
                              prev.map((item) =>
                                item.name === field.name
                                  ? { ...item, value }
                                  : item,
                              ),
                            );
                          }}
                        />
                        <FieldLabel>
                          <Label htmlFor={field.name}>
                            Esse é meu jogo favorito
                          </Label>
                        </FieldLabel>
                      </Field>
                    </FieldGroup>
                  ) : field.type === 'slider' ? (
                    <Field
                      className="flex flex-row items-center gap-4"
                      orientation="horizontal"
                    >
                      <Input
                        className="w-full"
                        id={field.name}
                        type="range"
                        min={field.name === 'rating' ? 1 : 0}
                        max={field.name === 'rating' ? 10 : 100}
                        step={field.name === 'rating' ? 1 : 5}
                        value={field.value as number}
                        onChange={(e: any) => {
                          const value = Number(e.target.value);
                          setFormData((prev) =>
                            prev.map((item) =>
                              item.name === field.name
                                ? { ...item, value }
                                : item,
                            ),
                          );
                        }}
                      />
                      <FieldLabel htmlFor={field.name}>
                        {field.name === 'rating'
                          ? `${field.value}`
                          : `${field.value}%`}
                      </FieldLabel>
                    </Field>
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      value={field.value as string | number}
                      onChange={(e: any) => {
                        const value = e.target.value;
                        setFormData((prev) =>
                          prev.map((item) =>
                            item.name === field.name
                              ? { ...item, value }
                              : item,
                          ),
                        );
                      }}
                    />
                  )}
                </div>
              </Field>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={updateGame}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
