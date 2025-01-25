import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Avatar, Flex, Text } from '@vibe/core';
import { ChatSessionHeaderProps } from '@monday-whatsapp/shared-types';

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
        className={cn('bg-gray-900 bg-opacity-10 px-5 py-3', className)}
        align={'center'}
        gap={'medium'}
      >
        <Avatar src={avatarSrc} size="large" type="img" />
        <Text>{name}</Text>
      </Flex>
    </>
  );
};
