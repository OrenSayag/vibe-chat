import { Theme, ThemeContext } from '@vibe-chat/components';
import { Link, useRouter } from '@vibe-chat/next-services/server';
import {
  OrganizationInfoSchema,
  OrganizationUserRole,
} from '@vibe-chat/shared-types';
import {
  Avatar,
  Box,
  Divider,
  Dropdown,
  Flex,
  List,
  ListItem,
  Text,
} from '@vibe/core';
import {
  ChartLine,
  Clock,
  Contact,
  Gauge,
  MessagesSquare,
  Settings,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FC, ReactNode, useContext, useMemo } from 'react';
import Logo from '../../assets/icons/icon.png';

import Instagram from '../../assets/icons/social/instagram.svg';
import Messenger from '../../assets/icons/social/messenger.svg';
import Telegram from '../../assets/icons/social/telegram.svg';
import Whatsapp from '../../assets/icons/social/whatsapp.svg';

interface Props {
  className?: string;
  selectedPath: string;
  organizations: (Omit<OrganizationInfoSchema, 'image'> & {
    subscriptionId: string;
    organizationUserRole: OrganizationUserRole;
    image: string;
  })[];
}

const ICON_SIZE = 20;
const ICON_COLOR = { default: '#374151', dark: 'white' };

export const Navbar: FC<Props> = ({
  className,
  selectedPath,
  organizations,
}) => {
  const { subscriptionId } = useParams();
  const router = useRouter();

  return (
    <>
      <div>
        <Head />
        <Divider />
        <OrganizationSelector
          organizations={organizations}
          selectedPath={selectedPath}
          subscriptionId={subscriptionId}
          router={router}
        />
        <Divider />
        <NavigationList
          selectedPath={selectedPath}
          subscriptionId={subscriptionId as string}
        />
        <Divider />
        <IntegrationsLinks selectedPath={selectedPath} />
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

function OrganizationSelector({
  organizations,
  selectedPath,
  subscriptionId,
  router,
}) {
  const dropdownOptions = useMemo(
    () =>
      organizations.map((org) => ({
        label: org.displayName,
        value: org.subscriptionId,
        ...(org.image
          ? {
              leftIcon: () => (
                <span style={{ marginRight: '.5em' }}>
                  <Avatar size={'small'} type="img" src={org.image} />
                </span>
              ),
            }
          : {}),
      })),
    [organizations]
  );

  const selectedOrganization = useMemo(() => {
    const found = organizations.find(
      (org) => org.subscriptionId === subscriptionId
    );
    return found
      ? {
          label: found.displayName,
          value: found.subscriptionId,
          ...(found.image
            ? {
                leftIcon: () => (
                  <span style={{ marginRight: '.5em' }}>
                    <Avatar size={'small'} type="img" src={found.image} />
                  </span>
                ),
              }
            : {}),
        }
      : undefined;
  }, [organizations, subscriptionId]);

  return (
    <div style={{ padding: '1em 2em' }}>
      <Dropdown
        clearable={false}
        value={selectedOrganization}
        searchable={false}
        options={dropdownOptions}
        onChange={(selected) => {
          if (selected?.value) {
            const newPath = selectedPath.replace(
              subscriptionId as string,
              selected.value
            );
            router.replace(newPath);
          }
        }}
      />
    </div>
  );
}

function NavigationList({
  selectedPath,
  subscriptionId,
}: {
  selectedPath: string;
  subscriptionId: string;
}) {
  const { theme } = useContext(ThemeContext);
  const t = useTranslations('Navbar');
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
      label: t('Dashboard'),
      href: `/dashboard/${subscriptionId}`,
      icon: <Gauge size={ICON_SIZE} stroke={iconColor} />,
    },
    CHATS: {
      label: t('Chats'),
      href: `/dashboard/${subscriptionId}/chats`,
      icon: <MessagesSquare size={ICON_SIZE} stroke={iconColor} />,
    },
    SCHEDULED: {
      label: t('Scheduled'),
      href: `/dashboard/${subscriptionId}/scheduled`,
      icon: <Clock size={ICON_SIZE} stroke={iconColor} />,
    },
    CONTACTS: {
      label: t('Contacts'),
      href: `/dashboard/${subscriptionId}/contacts`,
      icon: <Contact size={ICON_SIZE} stroke={iconColor} />,
    },
    ANALYTICS: {
      label: t('Analytics'),
      href: `/dashboard/${subscriptionId}/analytics`,
      icon: <ChartLine size={ICON_SIZE} stroke={iconColor} />,
    },
    SETTINGS: {
      label: t('Settings'),
      href: `/dashboard/${subscriptionId}/settings`,
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
            isSelected={
              info.href === `/dashboard/${subscriptionId}`
                ? selectedPath === info.href
                : selectedPath.startsWith(info.href)
            }
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

function IntegrationsLinks({ selectedPath }: { selectedPath: string }) {
  const t = useTranslations('Navbar');
  const { subscriptionId } = useParams();
  const integrations = [
    {
      href: `/dashboard/${subscriptionId}/integration/whatsapp`,
      src: Whatsapp,
      alt: 'WhatsApp',
      label: t('WhatsApp'),
    },
    {
      href: `/dashboard/${subscriptionId}/integration/instagram`,
      src: Instagram,
      alt: 'Instagram',
      label: t('Instagram'),
    },
    {
      href: `/dashboard/${subscriptionId}/integration/messenger`,
      src: Messenger,
      alt: 'Messenger',
      label: t('Messenger'),
    },
    {
      href: `/dashboard/${subscriptionId}/integration/telegram`,
      src: Telegram,
      alt: 'Telegram',
      label: t('Telegram'),
    },
  ];

  return (
    <Box>
      <List>
        {integrations.map(({ href, src, alt, label }) => (
          <Link href={href} key={label}>
            <ListItem size={'medium'} selected={selectedPath.startsWith(href)}>
              <Flex
                align={'center'}
                gap={'large'}
                style={{
                  padding: '0 1em',
                }}
              >
                <span>
                  <Image
                    src={src}
                    alt={alt}
                    style={{
                      width: '1.5em',
                      height: '1.5em',
                    }}
                  />
                </span>
                <Text>{label}</Text>
              </Flex>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}
