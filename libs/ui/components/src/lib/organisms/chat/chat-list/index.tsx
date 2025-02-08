import { FC } from 'react';
import { ChatListProps } from '@vibe-chat/shared-types';
import { Box, List, ListItem, Text } from '@vibe/core';
import { ChatListItem } from './chat-list-item';

export const ChatList: FC<ChatListProps> = ({
  list,
  selectedChatId,
  onSelectChat,
  onLoadMore,
  state,
}) => {
  if (state === 'loading') {
    return (
      <Box>
        <Text>Loading</Text>
      </Box>
    );
  }
  if (state === 'error') {
    return (
      <Box>
        <Text>Error</Text>
      </Box>
    );
  }
  return (
    <>
      <div>
        {list.length === 0 && <Empty />}
        <List>
          {list.map((item) => (
            <ListItem
              onClick={() => onSelectChat(item.phoneNumberId)}
              selected={item.phoneNumberId === selectedChatId}
              size={'large'}
            >
              <ChatListItem item={item} key={item.phoneNumberId} />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

function Empty() {
  return (
    <Box>
      <Text>No chats yet</Text>
    </Box>
  );
}
