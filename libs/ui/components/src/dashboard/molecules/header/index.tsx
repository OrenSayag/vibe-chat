'use client';

import { FC, useContext } from 'react';
import {
  Avatar,
  Box,
  Dialog,
  DialogContentContainer,
  Divider,
  Flex,
  List,
  ListItem,
  Text,
} from '@vibe/core';
import { HeaderProps } from '@monday-whatsapp/shared-types';
import { ChevronLeft, ChevronRight, Moon, Sparkle, Sun } from 'lucide-react';
import { Theme, ThemeContext } from '@monday-whatsapp/components';
import { useTranslations } from 'next-intl';
import { useDir } from '@monday-whatsapp/next-services';
import { Menu } from '../menu';
import { AppLocaleMenu } from '../app-locale-menu';

export const Header: FC<HeaderProps> = ({
  className,
  profileName,
  avatarSrc,
  signOut,
}) => {
  const dir = useDir();

  return (
    <>
      <div>
        <Flex
          justify={'space-between'}
          align={'center'}
          style={{
            padding: '.6em 1em',
            flexDirection: dir === 'rtl' ? 'row-reverse' : undefined,
          }}
        >
          <div></div>
          <Profile
            profileName={profileName}
            avatarSrc={avatarSrc}
            signOut={() => {
              signOut();
            }}
          />
        </Flex>
        <Divider withoutMargin />
      </div>
    </>
  );
};

function Profile({
  avatarSrc,
  profileName,
  signOut,
}: {
  avatarSrc?: string;
  profileName: string;
  signOut(): void;
}) {
  return (
    <Dialog
      content={
        <DialogContentContainer>
          <ProfileMenu
            signOut={() => {
              signOut();
            }}
          />
        </DialogContentContainer>
      }
      hideTrigger={['clickoutside']}
      showTrigger={['mouseenter', 'click']}
    >
      <button>
        <Flex align={'center'} gap={'small'}>
          <Avatar src={avatarSrc} type={'img'} size={'medium'} />
          <Text>{profileName}</Text>
        </Flex>
      </button>
    </Dialog>
  );
}

function ProfileMenu({ signOut }: { signOut(): void }) {
  const dir = useDir();
  const Chevron =
    dir === 'rtl'
      ? () => <ChevronRight size={15} />
      : () => <ChevronLeft size={15} />;
  const t = useTranslations('ProfileMenu');
  return (
    <Box rounded={'medium'} backgroundColor={'allgreyBackgroundColor'}>
      <List style={{ width: '100%' }}>
        <ListItem onClick={signOut}>
          <Box
            style={{
              width: '100%',
              textAlign: dir === 'rtl' ? 'right' : undefined,
            }}
          >
            {t('Logout')}
          </Box>
        </ListItem>
        <Dialog
          content={
            <DialogContentContainer>
              <ThemeMenu />
            </DialogContentContainer>
          }
          position={'left'}
          hideTrigger={['clickoutside']}
          showTrigger={['click']}
        >
          <ListItem>
            <Box
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '.4em',
                flexDirection: dir === 'rtl' ? 'row-reverse' : undefined,
                justifyContent: 'start',
              }}
            >
              <Chevron />
              <span>{t('Theme')}</span>
            </Box>
          </ListItem>
        </Dialog>
        <Dialog
          content={
            <DialogContentContainer>
              <AppLocaleMenu />
            </DialogContentContainer>
          }
          position={'left'}
          hideTrigger={['clickoutside']}
          showTrigger={['click']}
        >
          <ListItem>
            <Box
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '.4em',
                flexDirection: dir === 'rtl' ? 'row-reverse' : undefined,
              }}
            >
              <Chevron />
              <span>{t('Language')}</span>
            </Box>
          </ListItem>
        </Dialog>
      </List>
    </Box>
  );
}

function ThemeMenu() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <Menu
      items={[
        {
          selected: theme === Theme.LIGHT,
          onClick: () => setTheme(Theme.LIGHT),
          label: (
            <>
              <Sun size={15} />
              <span>Light</span>
            </>
          ),
        },
        {
          selected: theme === Theme.DARK,
          onClick: () => setTheme(Theme.DARK),
          label: (
            <>
              <Moon size={15} />
              <span>Dark</span>
            </>
          ),
        },
        {
          selected: theme === Theme.BLACK,
          onClick: () => setTheme(Theme.BLACK),
          label: (
            <>
              <Sparkle size={15} />
              <span>Black</span>
            </>
          ),
        },
      ]}
    />
  );
}
