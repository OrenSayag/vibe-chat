import { FC } from 'react';
import { Avatar, Flex, Text } from '@vibe/core';
import { ChatSessionHeaderProps } from '@vibe-chat/shared-types';

export const ChatSessionHeader: FC<ChatSessionHeaderProps> = ({
  className,
  name,
  avatarSrc,
  isOnline,
  lastSeen,
}) => {
  return (
    <>
      <Flex
        style={{
          backgroundColor: 'rgba(70, 73, 77, 0.1)',
          padding: '.6em 1em',
        }}
        align={'center'}
        gap={'medium'}
      >
        <Avatar src={avatarSrc} size="large" type="img" />
        <Text>{name}</Text>
      </Flex>
    </>
  );
};
