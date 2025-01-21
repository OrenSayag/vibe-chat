import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Box, Text } from '@vibe/core';

interface Props {
  className?: string;
}

export const ChatSessionPlaceholder: FC<Props> = ({ className }) => {
  return (
    <>
      <Box
        className={cn(
          'flex flex-col items-center justify-center h-full',
          className
        )}
      >
        <Text className={'text-3xl flex-grow'}>monday Chat</Text>
      </Box>
    </>
  );
};
