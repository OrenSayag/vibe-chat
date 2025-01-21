import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Avatar, Flex, Text } from '@vibe/core';

interface Props {
  className?: string;
  avatarSrc?: string;
  name: string;
  lastSeen?: number;
  isOnline?: boolean;
}

export const ChatSessionHeader: FC<Props> = ({
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
