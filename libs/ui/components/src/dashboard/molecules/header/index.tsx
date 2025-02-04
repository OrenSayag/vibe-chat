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
import { ChevronLeft, Moon, Sparkle, Sun } from 'lucide-react';
import { Theme, ThemeContext } from '@monday-whatsapp/components';

export const Header: FC<HeaderProps> = ({
  className,
  profileName,
  avatarSrc,
  signOut,
}) => {
  return (
    <>
      <div>
        <Flex
          justify={'space-between'}
          align={'center'}
          style={{
            padding: '.6em 1em',
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
  return (
    <Box rounded={'medium'} backgroundColor={'allgreyBackgroundColor'}>
      <List style={{ width: '100%' }}>
        <ListItem onClick={signOut}>
          <Box style={{ width: '100%' }}>Logout</Box>
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
              }}
            >
              <ChevronLeft size={15} />
              <span>Theme</span>
            </Box>
          </ListItem>
        </Dialog>
        <ListItem>
          <Box
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '.4em',
            }}
          >
            <ChevronLeft size={15} />
            <span>Language</span>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}

function ThemeMenu() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <Box rounded={'medium'} backgroundColor={'allgreyBackgroundColor'}>
      <List style={{ width: '100%' }}>
        <ListItem
          selected={theme === Theme.LIGHT}
          onClick={() => setTheme(Theme.LIGHT)}
        >
          <Box
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '.4em',
            }}
          >
            <Sun size={15} />
            <span>Light</span>
          </Box>
        </ListItem>
        <ListItem
          selected={theme === Theme.DARK}
          onClick={() => setTheme(Theme.DARK)}
        >
          <Box
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '.4em',
            }}
          >
            <Moon size={15} />
            <span>Dark</span>
          </Box>
        </ListItem>
        <ListItem
          selected={theme === Theme.BLACK}
          onClick={() => setTheme(Theme.BLACK)}
        >
          <Box
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '.4em',
            }}
          >
            <Sparkle size={15} />
            <span>Black</span>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}
