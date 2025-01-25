import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { ChatList } from '../chat-list';
import { ChatSession } from '../chat-session';
import { ChatSessionPlaceholder } from '../chat-session-placeholder';
import { Text } from '@vibe/core';
import { ChatProps } from '@monday-whatsapp/shared-types';

export const ChatLayout: FC<ChatProps> = ({
  className,
  sessionProps,
  listProps,
  loading,
  error,
}) => {
  return (
    <>
      {!loading && !error && (
        <div className={cn('flex', className)}>
          <ChatList {...listProps} />
          {sessionProps && (
            <ChatSession {...sessionProps} className={'flex-grow'} />
          )}
          {!sessionProps && <ChatSessionPlaceholder />}
        </div>
      )}
      {loading && <Text>Loading</Text>}
      {error && <Text>Error</Text>}
    </>
  );
};
