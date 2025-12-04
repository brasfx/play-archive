'use client';

import * as React from 'react';
import Link from 'next/link';

import { Gamepad, Gamepad2, GamepadDirectional, Joystick } from 'lucide-react';

import { NavDocuments } from '@/components/nav-documents';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import data from '@/data/sidebar-data';
import { useSession } from 'next-auth/react';
import { AuroraText } from './ui/aurora-text';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession();

  const icons = [Gamepad, Gamepad2, GamepadDirectional, Joystick];

  function getRandomIcon() {
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
  }

  function RandomIcon() {
    const [Icon, setIcon] = React.useState<typeof Gamepad | null>(null);

    React.useEffect(() => {
      setIcon(getRandomIcon());
    }, []);

    if (!Icon) return null;

    return <Icon className="size-7 animate-bounce text-primary" />;
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2">
              {RandomIcon()}
              <Link href="/">
                <span className="text-2xl font-semibold ">
                  <AuroraText>Play Archive</AuroraText>
                </span>
              </Link>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>

      <SidebarFooter>
        {session && status === 'authenticated' && <NavUser />}
      </SidebarFooter>
    </Sidebar>
  );
}
