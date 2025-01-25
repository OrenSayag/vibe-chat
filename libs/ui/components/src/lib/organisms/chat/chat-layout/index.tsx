import { FC, useEffect } from 'react';
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
  useEffect(() => {
    console.log({
      listPropsInLayout: listProps,
    });
  }, [listProps]);
  return (
    <>
      {!loading && !error && (
        <Flex>
          <div
            style={{
              width: '33%',
              borderRight: '1px solid white',
              height: '100vh',
            }}
          >
            <ChatList {...listProps} />
          </div>
          <div
            style={{
              flexGrow: 1,
            }}
          >
            {listProps.selectedChatId && sessionProps && (
              <ChatSession {...sessionProps} className={'flex-grow'} />
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
