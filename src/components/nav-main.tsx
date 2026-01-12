'use client';

import Link from 'next/link';
import { type Icon } from '@tabler/icons-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useTranslations } from 'next-intl';
import { signOut, useSession } from 'next-auth/react';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const t = useTranslations('homePage');
  const { status } = useSession();

  const isAuthenticated = status === 'authenticated';
  const onLogout = () => {
    signOut({ callbackUrl: '/' });
  };
  const filteredItems = items.filter((item) => {
    if (status === 'loading') return false;
    return isAuthenticated ? item.title !== 'login' : item.title !== 'logout';
  });
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {filteredItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              {item.title === 'logout' ? (
                <SidebarMenuButton tooltip={t(item.title)} onClick={onLogout}>
                  {item.icon && <item.icon />}
                  <span>{t(item.title)}</span>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton tooltip={t(item.title)} asChild>
                  <Link href={item.url}>
                    {item.icon && <item.icon />}
                    <span>{t(item.title)}</span>
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
