import { FC } from 'react';
import { ChatList } from '../chat-list';
import { ChatSession } from '../chat-session';
import { ChatSessionPlaceholder } from '../chat-session-placeholder';
import { Flex, Text } from '@vibe/core';
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
        <Flex
          style={{
            height: '100%',
          }}
        >
          <div
            style={{
              width: '33%',
              borderRight: '1px solid white',
              height: '100%',
            }}
          >
            <ChatList {...listProps} />
          </div>
          <div
            style={{
              flexGrow: 1,
              height: '100%',
            }}
          >
            {listProps.selectedChatId && sessionProps && (
              <ChatSession {...sessionProps} />
            )}
            {(!sessionProps || !listProps.selectedChatId) && (
              <ChatSessionPlaceholder />
            )}
          </div>
        </Flex>
      )}
      {loading && <Text>Loading layout</Text>}
      {error && <Text>Error</Text>}
    </>
  );
};
