import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Wallpaper } from 'lucide-react';
import { Button } from '../ui/button';
import { Spinner } from '../ui/spinner';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useAppStore } from '@/providers/AppProvider';
import { toast } from 'react-toastify';

export default function ChangeBackground() {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations('profile');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const images = Array.from({ length: 24 }, (_, i) => i + 1);
  //const [selectedImage, setSelectedImage] = React.useState<number>(0);

  const setProfileBgId = useAppStore((s) => s.setProfileBgId);
  const profileBgId = useAppStore((s) => s.profileBgId);

  const changeBackground = async () => {
    setIsSubmitting(true);
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bg_id: profileBgId,
        }),
      });
      toast.success('Plano de fundo atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar o perfil:', error);
      toast.error('Erro ao atualizar o perfil.');
    } finally {
      setOpen(false);
      setIsSubmitting(false);
    }
  };

  const removeBackground = () => {
    setProfileBgId(null);
    //setSelectedImage(0);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-foreground bg-background rounded-full w-full"
          variant="ghost"
          size="icon"
        >
          <Wallpaper />
          Plano de fundo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1025px] max-h-[95vh] overflow-hidden flex flex-col [&>button]:hidden">
        <DialogHeader className="shrink-0">
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('subtitle')}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-4">
            {images.map((image) => (
              <div
                key={image}
                onClick={() => {
                  //setSelectedImage(image);
                  setProfileBgId(image);
                }}
              >
                <Image
                  src={`/bg/${image}.jpg`}
                  alt="This is my background"
                  width={400}
                  height={400}
                  className={`${
                    profileBgId === image
                      ? 'border-2 border-red-500'
                      : 'border-2 border-foreground'
                  } rounded-lg w-full h-full`}
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter className="mt-4 shrink-0">
          <Button
            variant="destructive"
            type="button"
            onClick={removeBackground}
            className="md:absolute left-4 "
          >
            Remover plano de fundo
          </Button>
          <Button
            variant="outline"
            type="button"
            onClick={() => setOpen(false)}
          >
            {t('cancel')}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={changeBackground}
          >
            {isSubmitting ? <Spinner /> : t('saveChanges')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
