import { FC, ReactNode, useContext, useEffect } from 'react';
import { Box, Divider, Flex, List, ListItem, Text } from '@vibe/core';
import Image from 'next/image';
import Logo from '../../assets/icons/icon.png';
import {
  ChartLine,
  Clock,
  Contact,
  Gauge,
  MessagesSquare,
  Settings,
  TableOfContents,
} from 'lucide-react';
import Link from 'next/link';
import { Theme, ThemeContext } from '@monday-whatsapp/components';

interface Props {
  className?: string;
  selectedPath: string;
}

const ICON_SIZE = 20;
const ICON_COLOR = { default: '#374151', dark: 'white' };

export const Navbar: FC<Props> = ({ className, selectedPath }) => {
  return (
    <>
      <div>
        <Head />
        <Divider />
        <NavigationList selectedPath={selectedPath} />
      </div>
    </>
  );
};

function Head() {
  return (
    <Flex
      style={{
        padding: '.9em 2em .4em',
      }}
      justify={'start'}
      align={'center'}
      gap={'medium'}
    >
      <Box>
        <Image
          src={Logo}
          alt={'logo'}
          style={{
            margin: '0 auto',
            width: '2em',
          }}
        />
      </Box>
      <Text>Vibe Chat</Text>
    </Flex>
  );
}

function NavigationList({ selectedPath }: { selectedPath: string }) {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log({
      theme,
    });
  }, [theme]);

  const iconColor =
    theme === Theme.LIGHT ? ICON_COLOR.default : ICON_COLOR.dark;

  const navButtons: Record<
    string,
    {
      label: string;
      icon: ReactNode;
      href: string;
    }
  > = {
    DASHBOARD: {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <Gauge size={ICON_SIZE} stroke={iconColor} />,
    },
    CHATS: {
      label: 'Chats',
      href: '/dashboard/chats',
      icon: <MessagesSquare size={ICON_SIZE} stroke={iconColor} />,
    },
    TEMPLATES: {
      label: 'Templates',
      href: '/dashboard/templates',
      icon: <TableOfContents size={ICON_SIZE} stroke={iconColor} />,
    },
    SCHEDULED: {
      label: 'Scheduled',
      href: '/dashboard/scheduled',
      icon: <Clock size={ICON_SIZE} stroke={iconColor} />,
    },
    CONTACTS: {
      label: 'Contacts',
      href: '/dashboard/contacts',
      icon: <Contact size={ICON_SIZE} stroke={iconColor} />,
    },
    ANALYTICS: {
      label: 'Analytics',
      href: '/dashboard/analytics',
      icon: <ChartLine size={ICON_SIZE} stroke={iconColor} />,
    },
    SETTINGS: {
      label: 'Settings',
      href: '/dashboard/settings',
      icon: <Settings size={ICON_SIZE} stroke={iconColor} />,
    },
  } as const;

  type NavButtonInfo = (typeof navButtons)[keyof typeof navButtons];

  return (
    <Box>
      <List>
        {Object.values(navButtons).map((info) => (
          <NavListItem
            key={info.label}
            info={info}
            isSelected={selectedPath === info.href}
          />
        ))}
      </List>
    </Box>
  );

  function NavListItem({
    info,
    isSelected,
  }: {
    info: NavButtonInfo;
    isSelected?: boolean;
  }) {
    return (
      <Link href={info.href}>
        <ListItem size={'medium'} selected={isSelected}>
          <Flex
            align={'center'}
            gap={'large'}
            style={{
              padding: '0 1em',
            }}
          >
            <span>{info.icon}</span>
            <Text>{info.label}</Text>
          </Flex>
        </ListItem>
      </Link>
    );
  }
}
