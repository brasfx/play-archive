'use client';
import { useMemo } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'motion/react';
import { LogOut } from 'lucide-react';
import { BorderBeam } from '@/components/ui/border-beam';
import { Particles } from '@/components/ui/particles';
import { CoolMode } from '@/components/ui/cool-mode';
import { Badge } from '@/components/ui/badge';
import EditProfile from '@/components/profile/EditProfile';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

interface Props {
  profile?: {
    id: string;
    nickname: string;
    bio: string;
    favorite_game_name: string;
    favorite_platform: string;
    name: string;
    email: string;
    avatar_url: string;
    provider: string;
  };
}

export default function SocialLoginCard({ profile }: Props) {
  const t = useTranslations('profile');
  const { data: session } = useSession();
  const { resolvedTheme } = useTheme();
  const color = useMemo(
    () => (resolvedTheme === 'dark' ? '#ffffff' : '#0b0f13'),
    [resolvedTheme],
  );

  const email = profile?.email ?? session?.user?.email ?? '';
  const name = profile?.name ?? session?.user?.name ?? '';
  const avatar = profile?.avatar_url ?? session?.user?.image ?? '';
  const social = profile?.provider ?? session?.user?.provider ?? 'google';

  const onLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  const socialInfo = {
    google: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
            fill="currentColor"
          />
        </svg>
      ),
      label: 'Google',
    },
    github: {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path
            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            fill="currentColor"
          />
        </svg>
      ),
      label: 'GitHub',
    },
  };

  return (
    <div className="w-full px-10">
      <Card className="w-full max-w-[400px]  mx-auto h-auto justify-center shadow-xl border-none bg-foreground backdrop-blur-xl text-white dark:text-black">
        <CardHeader className="flex flex-col items-center gap-2 mt-10">
          <motion.img
            src={avatar}
            alt="Foto do usuário"
            width={84}
            height={84}
            loading="lazy"
            className="rounded-full border-2 border-indigo-600 shadow-lg h-[84px] w-[84px]"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />
          <div className="font-bold text-2xl">{name}</div>
          <div className="text-md bg-accent-foreground">{email}</div>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-2 ">
          <Badge variant="secondary">
            <div className="w-5">{socialInfo[social].icon}</div>
            <span className="text-base ">{socialInfo[social].label}</span>
          </Badge>
        </CardContent>

        <div className="flex flex-col text-start gap-2 p-4">
          <div className="flex flex-col justify-between">
            <span className="text-muted-foreground text-lg">
              {t('nickname')}
            </span>
            <span>{profile?.nickname}</span>
          </div>
          <div className="flex flex-col justify-between">
            <span className="text-muted-foreground text-lg">{t('bio')}</span>
            <span>{profile?.bio}</span>
          </div>
          <div className="flex flex-col justify-between">
            <span className="text-muted-foreground text-lg">
              {t('favoriteGames')}
            </span>
            <span>{profile?.favorite_game_name}</span>
          </div>
          <div className="flex flex-col justify-between">
            <span className="text-muted-foreground text-lg">
              {t('favoritePlatforms')}
            </span>
            <span>{profile?.favorite_platform}</span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
            <motion.div
              whileHover={{ scale: 1.04, rotate: -2 }}
              whileTap={{ scale: 0.96, rotate: 2 }}
            >
              <CoolMode>
                <Button
                  type="button"
                  variant="destructive"
                  className="w-full sm:w-40 bg-red-500"
                  onClick={onLogout}
                >
                  <LogOut />
                  Logout
                </Button>
              </CoolMode>
            </motion.div>
            <EditProfile
              nickname={profile?.nickname}
              bio={profile?.bio}
              favoriteGames={profile?.favorite_game_name}
              favoritePlatforms={profile?.favorite_platform}
            />
          </div>
        </div>
        <BorderBeam duration={10} size={300} borderWidth={2} />
      </Card>
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
    </div>
  );
}
