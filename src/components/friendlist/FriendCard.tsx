import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
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

import {
  MoreVertical,
  Check,
  X,
  Trash2,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Send,
} from 'lucide-react';

import type { FriendRow, PendingRow } from '@/types/friendship';
import type { PublicProfile } from '@/types/profile';

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

export default function FriendCard({
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
              alt="This is my avatar"
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
