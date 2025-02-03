import { FC } from 'react';
import { Avatar, Button, Dialog, Divider, Flex, Text } from '@vibe/core';
import { HeaderProps } from '@monday-whatsapp/shared-types';

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
    <Flex align={'center'} gap={'small'}>
      <Dialog
        content={
          <ProfileMenu
            signOut={() => {
              signOut();
            }}
          />
        }
        hideTrigger={['clickoutside']}
      >
        <Avatar src={avatarSrc} type={'img'} size={'medium'} />
      </Dialog>
      <Text>{profileName}</Text>
    </Flex>
  );
}

function ProfileMenu({ signOut }: { signOut(): void }) {
  return (
    <Flex direction={'column'}>
      <Button
        size={'xs'}
        onClick={() => {
          signOut();
        }}
      >
        Logout
      </Button>
    </Flex>
  );
}
