import { SectionCards } from '@/components/home/SectionCards';
import { StripedPattern } from '@/components/magicui/striped-pattern';
import { getRawGames } from '@/services/rawg';
import { getTranslations } from 'next-intl/server';

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const filters = {
    search: params.search || '',
    search_exact: params.search_exact === 'true',
    ordering: params.ordering || '',
    platforms: params.platforms || '',
    genres: params.genres || '',
    parent_platforms: params.parent_platforms || '',
  };

  const t = await getTranslations('homePage');
  const s = await getTranslations('search');

  const games = await getRawGames(filters);
  return (
    <div className="rounded-b-xl bg-[radial-gradient(circle_500px_at_50%_490px,rgba(139,92,246,0.4),transparent)] inset-0 z-0 flex justify-center">
      <StripedPattern className="z-0 opacity-20 rounded-xl" direction="right" />
      <SectionCards
        games={games}
        addButtonLabel={t('add')}
        detaislButtonLabel={t('details')}
        placeholderInput={s('placeholder')}
        labelInput={s('label')}
      />
    </div>
  );
}
