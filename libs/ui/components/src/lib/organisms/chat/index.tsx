import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Text } from '@vibe/core';

interface Props {
  className?: string;
}

export const Chat: FC<Props> = ({ className }) => {
  return (
    <>
      <div className={cn(className)}>
        <Text>Chat works!</Text>
      </div>
    </>
  );
};
