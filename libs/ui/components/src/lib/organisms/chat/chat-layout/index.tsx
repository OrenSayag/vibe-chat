'use client';

import { FC } from 'react';
import { ChatList } from '../chat-list';
import { ChatSession } from '../chat-session';
import { ChatSessionPlaceholder } from '../chat-session-placeholder';
import { Divider, Flex, Text } from '@vibe/core';
import { ChatProps } from '@vibe-chat/shared-types';
import { ChatMasterHeader } from '../chat-master-header';
import { NewChatModal } from '../new-chat-modal';

export const ChatLayout: FC<ChatProps> = ({
  className,
  sessionProps,
  listProps,
  loading,
  error,
  masterHeaderProps,
  newChatModalProps,
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
              height: '100%',
            }}
          >
            <ChatMasterHeader {...masterHeaderProps} />
            <ChatList {...listProps} />
          </div>
          <Divider direction={'vertical'} />
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
      <NewChatModal {...newChatModalProps} />
    </>
  );
};
