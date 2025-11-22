'use client';

import Link from 'next/link';
import { IconCirclePlusFilled, IconMail, type Icon } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useTranslations } from 'next-intl';

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
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <Link key={item.title} href={item.url}>
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton tooltip={t(item.title)}>
                  {item.icon && <item.icon />}
                  <span>{t(item.title)}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
