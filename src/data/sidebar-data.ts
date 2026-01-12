import {
  IconCamera,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';
import { LibraryBig, Joystick, CircleUser, LogIn, LogOut } from 'lucide-react';

const sidebarData = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/',
  },
  navMain: [
    {
      title: 'gallery',
      url: '/',
      icon: Joystick,
    },
    {
      title: 'library',
      url: '/my-library',
      icon: LibraryBig,
    },
    {
      title: 'friendlist',
      url: '/friendlist',
      icon: IconUsers,
    },
    {
      title: 'profile',
      url: '/profile',
      icon: CircleUser,
    },

    {
      title: 'login',
      url: '/login',
      icon: LogIn,
    },
    { title: 'logout', url: '#', icon: LogOut },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: IconCamera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: IconFileDescription,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: IconFileAi,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: 'Settings',
      url: '#',
      icon: IconSettings,
    },
    {
      title: 'Get Help',
      url: '#',
      icon: IconHelp,
    },
    {
      title: 'Search',
      url: '#',
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: 'Data Library',
      url: '#',
      icon: IconDatabase,
    },
    {
      name: 'Reports',
      url: '#',
      icon: IconReport,
    },
    {
      name: 'Word Assistant',
      url: '#',
      icon: IconFileWord,
    },
  ],
};

export default sidebarData;
