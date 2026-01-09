import React from 'react';
import { Button } from '@/components/ui/button';
import type { PublicProfile } from '@/types/profile';
import { motion } from 'motion/react';
import EditProfile from './EditProfile';
import ChangeBackground from './ChangeBackground';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export function ProfileHeader({
  profile,
  isOwner,
  onEdit,
}: {
  profile: PublicProfile;
  isOwner: boolean;
  onEdit?: () => void;
}) {
  const inviteFriend = async () => {
    try {
      await fetch('/api/friendships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addresseeId: profile.id }),
      });
      toast.success('Convite enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar convite:', error);
      toast.error('Erro ao enviar convite.');
    }
  };

  const onLogout = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="rounded-xl border bg-card/70 dark:bg-card backdrop-blur p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4 min-w-0">
          <motion.div
            className="relative h-20 w-20 overflow-hidden rounded-lg  border-2"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {profile.avatar_url ? (
              <motion.img
                src={profile.avatar_url}
                alt="Foto do usuário"
                loading="lazy"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            ) : (
              <div className="h-full w-full bg-muted" />
            )}
          </motion.div>

          <div className="min-w-0">
            <div className="truncate text-2xl font-bold">
              {profile.nickname}
            </div>
            {profile.location && (
              <div className="truncate text-sm text-foreground">
                {profile.location}
              </div>
            )}
            {profile.name && (
              <div className="truncate text-sm text-foreground">
                {profile.name}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col flex-wrap gap-2">
          {isOwner && <ChangeBackground />}
          {isOwner && (
            <EditProfile
              nickname={profile?.nickname}
              bio={profile?.bio}
              favoriteGameName={profile?.favorite_game_name}
              favoriteGameId={profile?.favorite_game_id_rawg}
              favoriteGameImage={profile?.favorite_game_image}
              favoritePlatforms={profile?.favorite_platform}
              favoriteGameProgress={profile?.favorite_game_progress}
              favoriteGameRating={profile?.favorite_game_rating}
            />
          )}
          {!isOwner && (
            <Button variant="outline" onClick={inviteFriend}>
              Adicionar amigo
            </Button>
          )}
          {isOwner && (
            <Button
              variant="destructive"
              onClick={onLogout}
              className="rounded-full"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
