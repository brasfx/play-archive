import { SectionCards } from '@/components/card/section-cards';
import { getRawGames } from '@/services/rawg';

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const filters = {
    search: params.search || '',
    search_exact: params.search_exact === 'true',
    ordering: params.ordering || '',
    platform: params.platform || '',
  };

  const games = await getRawGames(filters); // agora é server fetch
  return <SectionCards games={games} />;
}
