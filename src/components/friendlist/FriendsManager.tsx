'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { FriendRow, PendingRow } from '@/types/friendship';
import type { PublicProfile } from '@/types/profile';

import { UserPlus, Users, Inbox, Ban, Search } from 'lucide-react';
import { toast } from 'react-toastify';
import SidebarItem from './SidebarItem';
import FriendCard from './FriendCard';
import { useTranslations } from 'next-intl';

type ViewKey = 'friends' | 'add' | 'pending' | 'blocked' | 'suggested';

type Props = {
  accepted: FriendRow[];
  pending: PendingRow[];
  blocked: FriendRow[];

  onSearch?: (query: string) => void;
  onSearchUsers?: (query: string) => Promise<PublicProfile[]>;

  onAcceptInvite: (friendshipId: string) => Promise<void> | void;
  onRejectInvite: (friendshipId: string) => Promise<void> | void;

  onRemoveFriend: (friendshipId: string) => Promise<void> | void;
  onBlockFriend: (friendshipId: string) => Promise<void> | void;
  onUnblockFriend: (friendshipId: string) => Promise<void> | void;

  onSendInvite?: (publicIdOrNickname: string) => Promise<void> | void;
};

export function FriendsManager({
  accepted,
  pending,
  blocked,
  onSearch,
  onSearchUsers,
  onAcceptInvite,
  onRejectInvite,
  onRemoveFriend,
  onBlockFriend,
  onUnblockFriend,
  onSendInvite,
}: Props) {
  const [view, setView] = useState<ViewKey>('friends');
  const [q, setQ] = useState('');
  const [invite, setInvite] = useState('');
  const [currentInvite, setCurrentInvite] = useState<string>('');
  const [suggestions, setSuggestions] = useState<PublicProfile[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const t = useTranslations('friendlist');

  useEffect(() => {
    const t = setTimeout(() => onSearch?.(q), 250);
    return () => clearTimeout(t);
  }, [q, onSearch]);

  useEffect(() => {
    if (view !== 'add') return;

    const query = invite.trim();
    if (query.length < 2 || !onSearchUsers) {
      setSuggestions([]);
      return;
    }

    const t = setTimeout(async () => {
      try {
        setIsSearching(true);
        const users = await onSearchUsers(query);
        setSuggestions(users);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(t);
  }, [view, invite, onSearchUsers]);

  const norm = (s: string) => s.trim().toLowerCase();

  const acceptedFiltered = accepted.filter((r) =>
    r.friend?.name.toLowerCase().includes(norm(q)),
  );
  const blockedFiltered = blocked.filter((r) =>
    r.friend.name.toLowerCase().includes(norm(q)),
  );
  const pendingFiltered = pending.filter((r) =>
    r.friend.name.toLowerCase().includes(norm(q)),
  );

  const incoming = pendingFiltered.filter((p) => p.direction === 'incoming');
  const outgoing = pendingFiltered.filter((p) => p.direction === 'outgoing');

  const inviteFriend = async (publicIdOrNickname: string) => {
    try {
      await onSendInvite?.(publicIdOrNickname);
      toast.success(t('inviteSuccess'));
    } catch (e) {
      console.error(e);
      toast.error(t('inviteError'));
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-[260px_1fr] sm:px-7 px-2">
      <aside className="hidden md:block mt-4">
        <div className="rounded-lg border bg-card p-2">
          <SidebarItem
            active={view === 'friends'}
            icon={<Users className="h-4 w-4" />}
            label={t('friends')}
            count={accepted.length}
            onClick={() => setView('friends')}
          />
          <SidebarItem
            active={view === 'add'}
            icon={<UserPlus className="h-4 w-4" />}
            label={t('addFriends')}
            onClick={() => setView('add')}
          />
          <SidebarItem
            active={view === 'pending'}
            icon={<Inbox className="h-4 w-4" />}
            label={t('pending')}
            count={pending.length}
            onClick={() => setView('pending')}
          />
          <SidebarItem
            active={view === 'blocked'}
            icon={<Ban className="h-4 w-4" />}
            label={t('blocked')}
            count={blocked.length}
            onClick={() => setView('blocked')}
          />
        </div>
      </aside>

      <section className="rounded-lg border bg-card mt-4 overflow-x-hidden">
        <div className="flex flex-col gap-3 border-b p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold">
                {view === 'friends'
                  ? t('friends')
                  : view === 'pending'
                  ? t('pending')
                  : view === 'blocked'
                  ? t('blocked')
                  : t('addFriends')}
              </h2>
              <p className="text-sm text-muted-foreground">
                {t('searchTitle')}
              </p>
            </div>

            <div className="md:hidden max-w-full overflow-x-auto">
              <Tabs value={view} onValueChange={(v) => setView(v as ViewKey)}>
                <TabsList className="w-max">
                  <TabsTrigger value="friends">{t('friends')}</TabsTrigger>
                  <TabsTrigger value="pending">{t('pending')}</TabsTrigger>
                  <TabsTrigger value="blocked">{t('blocked')}</TabsTrigger>
                  <TabsTrigger value="add">{t('addFriends')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {view === 'friends' || view === 'add' ? (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={view === 'add' ? invite : q}
                onChange={(e) =>
                  view === 'add'
                    ? setInvite(e.target.value)
                    : setQ(e.target.value)
                }
                placeholder={
                  view === 'add'
                    ? t('searchPlaceholder')
                    : t('searchPlaceholderInput')
                }
                className="pl-9"
              />
            </div>
          ) : null}
        </div>

        <ScrollArea className="h-[calc(100vh-240px)]">
          <div className="p-4">
            {view === 'friends' ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{t('yourList')}</h3>
                  <Badge variant="secondary">{acceptedFiltered.length}</Badge>
                </div>

                <div className="grid gap-2">
                  {acceptedFiltered.map((r) => (
                    <FriendCard
                      key={r.friendshipId}
                      row={r}
                      kind="accepted"
                      onAcceptInvite={onAcceptInvite}
                      onRejectInvite={onRejectInvite}
                      onRemoveFriend={onRemoveFriend}
                      onBlockFriend={onBlockFriend}
                      onUnblockFriend={onUnblockFriend}
                    />
                  ))}

                  {acceptedFiltered.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      {t('noInvites')}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {view === 'add' && suggestions.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">{t('suggested')}</h3>
                <div className="grid gap-2">
                  {suggestions.map((s) => (
                    <FriendCard
                      key={s.id}
                      row={{
                        friendshipId: s.id,
                        friend: s,
                      }}
                      kind="suggested"
                      onAcceptInvite={onAcceptInvite}
                      onRejectInvite={onRejectInvite}
                      onRemoveFriend={onRemoveFriend}
                      onBlockFriend={onBlockFriend}
                      onUnblockFriend={onUnblockFriend}
                      onSendInvite={inviteFriend}
                    />
                  ))}
                </div>
              </div>
            ) : null}

            {view === 'add' ? (
              <div className="space-y-3 mt-3">
                <h3 className="text-sm font-semibold">{t('sendInvite')}</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    value={currentInvite}
                    onChange={(e) => setCurrentInvite(e.target.value)}
                    placeholder={t('publicId')}
                    className="w-full sm:flex-1 min-w-0"
                  />
                  <Button
                    onClick={() => inviteFriend?.(currentInvite)}
                    disabled={
                      !currentInvite.trim() || !onSendInvite || isSearching
                    }
                    className="w-full sm:w-auto whitespace-nowrap"
                  >
                    <UserPlus className="h-4 w-4" />
                    {t('sendInvite')}
                  </Button>
                </div>
              </div>
            ) : null}

            {view === 'pending' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">
                      {t('receivedInvites')}
                    </h3>
                    <Badge variant="secondary">{incoming.length}</Badge>
                  </div>

                  <div className="grid gap-2">
                    {incoming.map((r) => (
                      <FriendCard
                        key={r.friendshipId}
                        row={r}
                        kind="pending"
                        onAcceptInvite={onAcceptInvite}
                        onRejectInvite={onRejectInvite}
                        onRemoveFriend={onRemoveFriend}
                        onBlockFriend={onBlockFriend}
                        onUnblockFriend={onUnblockFriend}
                      />
                    ))}
                    {incoming.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        {t('noInvites')}
                      </p>
                    ) : null}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">
                      {t('sentInvites')}
                    </h3>
                    <Badge variant="secondary">{outgoing.length}</Badge>
                  </div>

                  <div className="grid gap-2">
                    {outgoing.map((r) => (
                      <FriendCard
                        key={r.friendshipId}
                        row={r}
                        kind="pending"
                        onAcceptInvite={onAcceptInvite}
                        onRejectInvite={onRejectInvite}
                        onRemoveFriend={onRemoveFriend}
                        onBlockFriend={onBlockFriend}
                        onUnblockFriend={onUnblockFriend}
                      />
                    ))}
                    {outgoing.length === 0 ? (
                      <p className="text-sm text-muted-foreground">
                        {t('noInvites')}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            {view === 'blocked' ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">{t('blocked')}</h3>
                  <Badge variant="secondary">{blockedFiltered.length}</Badge>
                </div>

                <div className="grid gap-2">
                  {blockedFiltered.map((r) => (
                    <FriendCard
                      key={r.friendshipId}
                      row={r}
                      kind="blocked"
                      onAcceptInvite={onAcceptInvite}
                      onRejectInvite={onRejectInvite}
                      onRemoveFriend={onRemoveFriend}
                      onBlockFriend={onBlockFriend}
                      onUnblockFriend={onUnblockFriend}
                    />
                  ))}
                  {blockedFiltered.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      {t('noBlocked')}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </ScrollArea>
      </section>
    </div>
  );
}
