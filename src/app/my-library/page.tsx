import { LibraryCards } from '@/components/card/library-cards';
import { getLibrary } from '@/services/getLibrary';

export default async function MyLibraryPage() {
  const games = await getLibrary();

  return <LibraryCards games={games} />;
}
