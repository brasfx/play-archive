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
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Trash } from 'lucide-react';

interface Labels {
  title: string;
  message: string;
  cancel: string;
  confirm: string;
}

interface DeleteGameProps {
  gameId: number;
  disabled: boolean;
  handleDelete: () => void;
  labels?: Labels;
}

export function DeleteGame({
  gameId,
  disabled,
  handleDelete,
  labels,
}: DeleteGameProps) {
  const { title, message, cancel, confirm } = labels as Labels;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2"
          size="icon"
          variant="destructive"
          disabled={disabled}
        >
          <Trash />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              {`Link to game ${gameId}`}
            </Label>
          </div>
        </div>
        <DialogFooter className="flex flex-row items-center justify-start gap-2">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              {cancel}
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            {confirm}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
