import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  BookIcon,
  ClapperboardIcon,
  CogIcon,
  ImageIcon,
  TrophyIcon,
} from 'lucide-react';
import Image from 'next/image';
import ImageZoom from '../zoom/ImageZoom';
import { HeroVideoDialog } from '../ui/hero-video-dialog';
import { set } from 'zod';

interface CustomTabProps {
  platforms: any;
  descriptionTranslated: string;
  gameId: string;
  screenshotsCount: number;
  achievementsCount: number;
  moviesCount: number;
}

interface Tab {
  label: string;
  value: string;
  content: React.ReactNode;
  icon: any;
  disabled?: boolean;
}

type Achievement = {
  id: string;
  name: string;
  description: string;
  percent: number;
  image: string;
};

type Screenshot = {
  id: string;
  image: string;
};

type Trailer = {
  id: string;
  name: string;
  data: {
    max: string;
    '480': string;
  };
  preview: string;
};

function CustomTab({
  platforms,
  descriptionTranslated,
  gameId,
  screenshotsCount,
  achievementsCount,
  moviesCount,
}: CustomTabProps) {
  const t = useTranslations('gameDetails');
  const [screenshots, setScreenshots] = useState<Screenshot[]>([]);
  const [trailer, setTrailer] = useState<Trailer[] | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isRequesting, setIsRequesting] = useState(false);

  const getScreenshots = async (id: string) => {
    const response = await fetch(`/api/rawg/screenshots/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar screenshots');
    }
    const data = await response.json();

    setScreenshots(data.results);
  };

  const getTrailer = async (id: string) => {
    const response = await fetch(`/api/rawg/movies/${id}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar trailer');
    }
    const data = await response.json();

    setTrailer(data.results);
  };

  const getAchievementes = async (id: string) => {
    setIsRequesting(true);
    try {
      const response = await fetch(`/api/rawg/achievements/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar achievements');
      }
      const data = await response.json();

      setAchievements(data.results);
    } catch (error) {
      console.error('Erro ao buscar achievements:', error);
      setAchievements([]);
    } finally {
      setIsRequesting(false);
    }
  };

  const requirements = platforms
    ?.map((p) => {
      if (p.requirements && p.requirements.minimum) {
        return (
          <div key={p.platform.id} className="mb-4">
            <h4 className="font-semibold mb-2">{p.platform.name}</h4>
            <div
              dangerouslySetInnerHTML={{ __html: p.requirements.minimum || '' }}
              className="text-sm text-muted-foreground"
            />
          </div>
        );
      }
      return null;
    })
    .filter(Boolean);

  const tabs: Tab[] = [
    {
      label: t('description'),
      value: 'description',
      content: (
        <div
          dangerouslySetInnerHTML={{
            __html: descriptionTranslated || '',
          }}
        />
      ),
      icon: BookIcon,
    },
    {
      label: t('requirements'),
      value: 'requirements',
      content: <div>{requirements.length ? requirements : 'N/A'}</div>,
      icon: CogIcon,
    },
    {
      label: t('achievements'),
      value: 'achievements',
      content: achievements.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 justify-self-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
          {achievements.map((achievement: Achievement) => (
            <div
              key={achievement.id}
              className="mt-4 mb-6 grid grid-rows-[auto_auto] items-start"
            >
              <div className="mb-1 text-lg font-semibold">
                {achievement.name}
              </div>

              <div className="mb-2 text-sm text-muted-foreground line-clamp-2">
                {achievement.description}
              </div>

              <div className="mb-2 text-xs text-muted-foreground">
                Unlock rate: {achievement.percent}%
              </div>

              <div className="relative h-40 w-40 overflow-hidden rounded-md border mt-2">
                <Image
                  src={achievement.image}
                  alt={achievement.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
          {achievements.length === 0 && (
            <div>Nenhum achievement disponível.</div>
          )}
        </div>
      ) : isRequesting ? (
        <div>Carregando achievements...</div>
      ) : (
        <div>Nenhum achievement disponível.</div>
      ),
      icon: TrophyIcon,
    },
    {
      label: t('screenshots'),
      value: 'gallery',
      content: screenshots.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {screenshots.map((screenshot: Screenshot) => (
            <div key={screenshot.id} className=" mb-4 mt-4">
              <ImageZoom
                src={screenshot.image}
                alt={`Screenshot ${screenshot.id}`}
                thumbHeight={500}
                thumbWidth={500}
              />
            </div>
          ))}
          {screenshots.length === 0 && (
            <div>Nenhuma screenshot disponível.</div>
          )}
        </div>
      ) : (
        <div>Carregando screenshots...</div>
      ),

      icon: ImageIcon,
    },
    {
      label: t('trailers'),
      value: 'trailer',
      content: trailer ? (
        <div className="relative">
          {trailer?.map((video: Trailer) => (
            <div key={video.id}>
              <div className="mb-4 mt-4 text-xl">{video.name}</div>
              <HeroVideoDialog
                className="block"
                animationStyle="top-in-bottom-out"
                videoSrc={video.data.max}
                thumbnailSrc={video.preview}
                thumbnailAlt={video.name}
              />
            </div>
          ))}

          {trailer?.length === 0 && <div>Nenhum trailer disponível.</div>}
        </div>
      ) : (
        <div>Carregando trailers...</div>
      ),
      icon: ClapperboardIcon,
    },
  ];

  return (
    <Tabs defaultValue="description">
      <div className="w-full overflow-x-auto">
        <div className="flex gap-3 whitespace-nowrap">
          <TabsList>
            {tabs.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                onClick={() => {
                  if (value === 'gallery' && screenshots.length === 0) {
                    getScreenshots(gameId);
                  }
                  if (value === 'trailer' && trailer === null) {
                    getTrailer(gameId);
                  }
                  if (value === 'achievements' && achievements?.length === 0) {
                    getAchievementes(gameId);
                  }
                }}
              >
                <Icon />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>
      {tabs.map(({ content, value }) => (
        <TabsContent key={value} value={value}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default CustomTab;
