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
import { useTranslations } from 'next-intl';

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

  const t = useTranslations('friendlist');

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
                ? t('receivedInvites')
                : t('sentInvite')
              : kind === 'blocked'
              ? t('blocked')
              : t('friend')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {kind === 'pending' ? (
          (row as PendingRow).direction === 'incoming' ? (
            <>
              <Button
                aria-label={t('accept')}
                size="sm"
                onClick={() => onAcceptInvite(row.friendshipId)}
                className="gap-2"
              >
                <Check className="h-4 w-4" />
                {t('accept')}
              </Button>
              <Button
                aria-label={t('reject')}
                size="sm"
                variant="secondary"
                onClick={() => onRejectInvite(row.friendshipId)}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                {t('reject')}
              </Button>
            </>
          ) : (
            <Badge variant="secondary">{t('waiting')}</Badge>
          )
        ) : null}

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" aria-label="actions">
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
                    title: t('unblock'),
                    desc: `${t('unblock')} ${friend.nickname ?? friend.name}?`,
                  })
                }
              >
                <ShieldCheck className="h-4 w-4" />
                {t('unblock')}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className="gap-2"
                onClick={() =>
                  setConfirm({
                    type: 'block',
                    title: t('block'),
                    desc: `${t('block')} ${friend.nickname || friend.name}?`,
                  })
                }
              >
                <ShieldAlert className="h-4 w-4" />
                {t('block')}
              </DropdownMenuItem>
            )}

            {kind !== 'blocked' ? <DropdownMenuSeparator /> : null}

            {kind === 'pending' ? (
              <DropdownMenuItem
                className="gap-2"
                onClick={() =>
                  setConfirm({
                    type: 'remove',
                    title: t('cancel'),
                    desc: `${t('cancelTo')} ${friend.nickname}?`,
                  })
                }
              >
                <ShieldX className="h-4 w-4" />
                {t('cancelInvite')}
              </DropdownMenuItem>
            ) : null}

            {kind === 'accepted' ? (
              <DropdownMenuItem
                className="gap-2 text-destructive focus:text-destructive"
                onClick={() =>
                  setConfirm({
                    type: 'remove',
                    title: t('remove'),
                    desc: t('removeInvite', { name: friend.nickname }),
                  })
                }
              >
                <Trash2 className="h-4 w-4" />
                {t('remove')}
              </DropdownMenuItem>
            ) : null}

            {kind === 'suggested' ? (
              <DropdownMenuItem
                className="gap-2"
                onClick={() => onSendInvite?.(friend.public_id ?? friend.id)}
              >
                <Send className="h-4 w-4" />
                {t('sendInvite')}
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
              {t('cancel')}
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
              {t('confirm')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
