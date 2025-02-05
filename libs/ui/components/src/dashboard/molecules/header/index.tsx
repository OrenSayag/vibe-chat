import { FC, ReactNode, useContext, useEffect } from 'react';
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
import { HeaderProps, Locale } from '@monday-whatsapp/shared-types';
import { ChevronLeft, ChevronRight, Moon, Sparkle, Sun } from 'lucide-react';
import { Theme, ThemeContext } from '@monday-whatsapp/components';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@monday-whatsapp/next-services/server';
import { useParams } from 'next/navigation';
import { useDir } from '@monday-whatsapp/next-services';

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
                flexDirection: dir === 'rtl' ? 'row-reverse' : undefined,
                justifyContent: 'start',
              }}
            >
              <Chevron />
              <span>Theme</span>
            </Box>
          </ListItem>
        </Dialog>
        <Dialog
          content={
            <DialogContentContainer>
              <LanguagesMenu />
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
              <span>Language</span>
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

function Menu({
  items,
}: {
  items: {
    label: ReactNode;
    selected?: boolean;
    onClick?(): void;
  }[];
}) {
  return (
    <Box rounded={'medium'} backgroundColor={'allgreyBackgroundColor'}>
      <List style={{ width: '100%' }}>
        {items.map((item, i) => (
          <ListItem
            key={`menu-item-${i}`}
            selected={item.selected}
            onClick={item.onClick}
          >
            <Box
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '.4em',
              }}
            >
              {item.label}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

function LanguagesMenu() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const onLocaleChange = (l: Locale) => {
    router.replace(
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      { pathname, params },
      { locale: l }
    );
  };
  return (
    <Menu
      items={[
        {
          selected: locale === Locale.ENGLISH,
          onClick: () => onLocaleChange(Locale.ENGLISH),
          label: (
            <>
              <span>English</span>
            </>
          ),
        },
        {
          selected: locale === Locale.HEBREW,
          onClick: () => onLocaleChange(Locale.HEBREW),
          label: (
            <>
              <span>Hebrew</span>
            </>
          ),
        },
      ]}
    />
  );
}
