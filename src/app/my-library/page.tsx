import { LibraryCards } from '@/components/card/library-cards';
import { StripedPattern } from '@/components/magicui/striped-pattern';
import { getLibrary } from '@/services/getLibrary';
import { getTranslations } from 'next-intl/server';

export default async function MyLibraryPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const games: any = await getLibrary();

  const t = await getTranslations('library');

  const labels = {
    wishlist: t('wishlist'),
    playing: t('playing'),
    completed: t('completed'),
    dropped: t('dropped'),
    details: t('details'),
    edit: t('edit'),
    cancel: t('cancel'),
    confirm: t('confirm'),
    deleteMessage: t('deleteMessage'),
    deleteTitle: t('deleteTitle'),
  };

  return (
    <div className="rounded-b-xl bg-[radial-gradient(circle_500px_at_50%_490px,rgba(139,92,246,0.4),transparent)] inset-0 z-0">
      <StripedPattern className="z-0 opacity-20 rounded-xl" direction="left" />
      <LibraryCards games={games} labels={labels} />
    </div>
  );
}
