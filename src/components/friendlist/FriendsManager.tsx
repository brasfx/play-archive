'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { FriendRow, PendingRow } from '@/types/friendship';
import type { PublicProfile } from '@/types/profile';

import {
  UserPlus,
  Users,
  Inbox,
  Ban,
  MoreVertical,
  Check,
  X,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  Search,
  ShieldX,
  Send,
} from 'lucide-react';
import { toast } from 'react-toastify';
import Link from 'next/link';

type ViewKey = 'friends' | 'add' | 'pending' | 'blocked' | 'suggested';

type Props = {
  accepted: FriendRow[];
  pending: FriendRow[];
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

function SidebarItem({
  active,
  icon,
  label,
  count,
  onClick,
}: {
  active?: boolean;
  icon: React.ReactNode;
  label: string;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between rounded-md px-3 py-2 text-left text-sm transition',
        active
          ? 'bg-primary text-white font-semibold'
          : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
      )}
    >
      <span className="flex items-center gap-2">
        <span className={cn(active ? 'text-white' : 'text-muted-foreground')}>
          {icon}
        </span>
        <span>{label}</span>
      </span>

      {typeof count === 'number' ? (
        <span
          className={cn(
            active ? 'text-white' : 'text-muted-foreground',
            'text-xs tabular-nums',
          )}
        >
          {count}
        </span>
      ) : null}
    </button>
  );
}

function FriendCard({
  row,
  kind,
  onAcceptInvite,
  onRejectInvite,
  onRemoveFriend,
  onBlockFriend,
  onUnblockFriend,
  onSendInvite,
}: {
  row: FriendRow | PendingRow;
  kind: 'accepted' | 'pending' | 'blocked' | 'suggested';
  onAcceptInvite: Props['onAcceptInvite'];
  onRejectInvite: Props['onRejectInvite'];
  onRemoveFriend: Props['onRemoveFriend'];
  onBlockFriend: Props['onBlockFriend'];
  onUnblockFriend: Props['onUnblockFriend'];
  onSendInvite?: Props['onSendInvite'];
}) {
  const friend = row.friend;

  const [confirm, setConfirm] = React.useState<null | {
    type: 'remove' | 'block' | 'unblock' | 'sendInvite';
    title: string;
    desc: string;
  }>(null);

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border bg-card p-3">
      <div className="flex min-w-0 items-center gap-3">
        <Link
          href={`profile/${friend.public_id}`}
          className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-muted"
        >
          {friend.avatar_url ? (
            <Image
              src={friend.avatar_url}
              alt={friend.name}
              fill
              className="object-cover"
              sizes="40px"
            />
          ) : null}
        </Link>

        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{friend.name}</p>
          <p className="truncate text-sm font-medium">{friend.nickname}</p>
          <p className="truncate text-xs text-muted-foreground">
            {kind === 'pending'
              ? (row as PendingRow).direction === 'incoming'
                ? 'Convite recebido'
                : 'Convite enviado'
              : kind === 'blocked'
              ? 'Bloqueado'
              : 'Amigo'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {kind === 'pending' ? (
          (row as PendingRow).direction === 'incoming' ? (
            <>
              <Button
                size="sm"
                onClick={() => onAcceptInvite(row.friendshipId)}
                className="gap-2"
              >
                <Check className="h-4 w-4" />
                Aceitar
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => onRejectInvite(row.friendshipId)}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Rejeitar
              </Button>
            </>
          ) : (
            <Badge variant="secondary">Aguardando</Badge>
          )
        ) : null}

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" aria-label="Ações">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-44 bg-background">
            {kind === 'blocked' ? (
              <DropdownMenuItem
                className="gap-2"
                onClick={() =>
                  setConfirm({
                    type: 'unblock',
                    title: 'Desbloquear',
                    desc: `Desbloquear ${friend.nickname ?? friend.name}?`,
                  })
                }
              >
                <ShieldCheck className="h-4 w-4" />
                Desbloquear
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="gap-2"
                onClick={() =>
                  setConfirm({
                    type: 'block',
                    title: 'Bloquear',
                    desc: `Bloquear ${friend.nickname || friend.name}?`,
                  })
                }
              >
                <ShieldAlert className="h-4 w-4" />
                Bloquear
              </DropdownMenuItem>
            )}

            {kind !== 'blocked' ? <DropdownMenuSeparator /> : null}

            {kind === 'pending' ? (
              <DropdownMenuItem
                className="gap-2"
                onClick={() =>
                  setConfirm({
                    type: 'remove',
                    title: 'Cancelar',
                    desc: `Cancelar convite de ${friend.nickname}?`,
                  })
                }
              >
                <ShieldX className="h-4 w-4" />
                Cancelar convite
              </DropdownMenuItem>
            ) : null}

            {kind === 'accepted' ? (
              <DropdownMenuItem
                className="gap-2 text-destructive focus:text-destructive"
                onClick={() =>
                  setConfirm({
                    type: 'remove',
                    title: 'Remover amigo',
                    desc: `Remover ${friend.nickname} da sua lista?`,
                  })
                }
              >
                <Trash2 className="h-4 w-4" />
                Remover
              </DropdownMenuItem>
            ) : null}

            {kind === 'suggested' ? (
              <DropdownMenuItem
                className="gap-2"
                onClick={() => onSendInvite?.(friend.public_id ?? friend.id)}
              >
                <Send className="h-4 w-4" />
                Enviar convite
              </DropdownMenuItem>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{confirm?.title}</DialogTitle>
            <DialogDescription>{confirm?.desc}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirm(null)}>
              Cancelar
            </Button>
            <Button
              variant={confirm?.type === 'remove' ? 'destructive' : 'default'}
              onClick={async () => {
                if (!confirm) return;
                if (confirm.type === 'remove')
                  await onRemoveFriend(row.friendshipId);
                if (confirm.type === 'block')
                  await onBlockFriend(row.friendshipId);
                if (confirm.type === 'unblock')
                  await onUnblockFriend(row.friendshipId);
                setConfirm(null);
              }}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
  const [view, setView] = React.useState<ViewKey>('friends');
  const [q, setQ] = React.useState('');
  const [invite, setInvite] = React.useState('');
  const [currentInvite, setCurrentInvite] = React.useState<string>('');
  const [suggestions, setSuggestions] = React.useState<PublicProfile[]>([]);
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => onSearch?.(q), 250);
    return () => clearTimeout(t);
  }, [q, onSearch]);

  React.useEffect(() => {
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
  console.log('acceptedFiltered', acceptedFiltered);
  const blockedFiltered = blocked.filter((r) =>
    r.friend.name.toLowerCase().includes(norm(q)),
  );
  const pendingFiltered = pending.filter((r) =>
    r.friend.name.toLowerCase().includes(norm(q)),
  );
  console.log('pendingFiltered', pendingFiltered);

  const incoming = pendingFiltered.filter((p) => p.direction === 'incoming');
  const outgoing = pendingFiltered.filter((p) => p.direction === 'outgoing');

  const inviteFriend = async (publicIdOrNickname: string) => {
    try {
      await onSendInvite?.(publicIdOrNickname);
      toast.success('Convite enviado!');
    } catch (e) {
      console.error(e);
      toast.error('Erro ao enviar convite');
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-[260px_1fr] sm:px-7 px-2">
      <aside className="hidden md:block mt-4">
        <div className="rounded-lg border bg-card p-2">
          <SidebarItem
            active={view === 'friends'}
            icon={<Users className="h-4 w-4" />}
            label="Amigos"
            count={accepted.length}
            onClick={() => setView('friends')}
          />
          <SidebarItem
            active={view === 'add'}
            icon={<UserPlus className="h-4 w-4" />}
            label="Adicionar amigo"
            onClick={() => setView('add')}
          />
          <SidebarItem
            active={view === 'pending'}
            icon={<Inbox className="h-4 w-4" />}
            label="Pendentes"
            count={pending.length}
            onClick={() => setView('pending')}
          />
          <SidebarItem
            active={view === 'blocked'}
            icon={<Ban className="h-4 w-4" />}
            label="Bloqueados"
            count={blocked.length}
            onClick={() => setView('blocked')}
          />
        </div>
      </aside>

      <section className="rounded-lg border bg-card mt-4">
        <div className="flex flex-col gap-3 border-b p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold">
                {view === 'friends'
                  ? 'Amigos'
                  : view === 'pending'
                  ? 'Pendentes'
                  : view === 'blocked'
                  ? 'Bloqueados'
                  : 'Adicionar amigo'}
              </h2>
              <p className="text-sm text-muted-foreground">
                Buscar, aceitar convites, remover e bloquear.
              </p>
            </div>

            <div className="md:hidden">
              <Tabs value={view} onValueChange={(v) => setView(v as ViewKey)}>
                <TabsList>
                  <TabsTrigger value="friends">Amigos</TabsTrigger>
                  <TabsTrigger value="pending">Pendentes</TabsTrigger>
                  <TabsTrigger value="blocked">Bloqueados</TabsTrigger>
                  <TabsTrigger value="add">Adicionar</TabsTrigger>
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
                    ? 'Buscar usuário por nickname...'
                    : 'Buscar por nickname...'
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
                  <h3 className="text-sm font-semibold">Sua lista</h3>
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
                      Nenhum amigo encontrado.
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            {view === 'add' && suggestions.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Sugestões</h3>
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
                <h3 className="text-sm font-semibold">Enviar convite</h3>
                <div className="flex gap-2">
                  <Input
                    value={currentInvite}
                    onChange={(e) => setCurrentInvite(e.target.value)}
                    placeholder="Public ID ou nickname"
                  />
                  <Button
                    onClick={() => inviteFriend?.(currentInvite)}
                    disabled={
                      !currentInvite.trim() || !onSendInvite || isSearching
                    }
                    className="gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Enviar
                  </Button>
                </div>
              </div>
            ) : null}

            {view === 'pending' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">
                      Convites recebidos
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
                        Nenhum convite recebido.
                      </p>
                    ) : null}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold">Convites enviados</h3>
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
                        Nenhum convite enviado.
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ) : null}

            {view === 'blocked' ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold">Bloqueados</h3>
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
                      Nenhum usuário bloqueado.
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
