'use client';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function GameDetails({ game, descriptionTranslated }) {
  const {
    name,
    metacritic,
    genres,
    platforms,
    rating,
    background_image,
    released,
  } = game;

  const t = useTranslations('gameDetails');

  if (!game) return <div>Jogo não encontrado.</div>;

  return (
    <div>
      <div className="grid-cols-2 gap-8 p-8 md:grid max-w-[1400px] align-middle mx-auto bg-background rounded-lg">
        <div>
          <Image
            src={background_image || '/no-image-available.png'}
            alt={name}
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
        <div>
          <h1 className="mb-4 text-3xl font-bold">{name}</h1>
          <p className="mb-2">
            <strong>Metacritic:</strong> {metacritic || 'N/A'}
          </p>
          <p className="mb-2">
            <strong>Genres:</strong>{' '}
            {genres?.map((genre) => genre.name).join(', ') || 'N/A'}
          </p>
          <p className="mb-2">
            <strong>Platforms:</strong>{' '}
            {platforms?.map((plat) => plat.platform.name).join(', ') || 'N/A'}
          </p>
          <p className="mb-2">
            <strong>Rating:</strong> {rating || 'N/A'}
          </p>
          <p className="mb-2">
            <strong>Released:</strong> {released || 'N/A'}
          </p>
        </div>
      </div>
      <div>
        <h2 className="mb-4 mt-8 text-2xl font-bold max-w-[1400px] mx-auto px-8">
          {t('description')}
        </h2>
        <div
          className="max-w-[1400px] mx-auto px-8 prose prose-lg dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: descriptionTranslated || '' }}
        />
      </div>
    </div>
  );
}
