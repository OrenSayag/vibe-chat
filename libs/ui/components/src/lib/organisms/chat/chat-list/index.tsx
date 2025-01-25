import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { ChatListProps } from '@monday-whatsapp/shared-types';
import { List, ListItem } from '@vibe/core';
import { ChatListItem } from './chat-list-item';

export const ChatList: FC<ChatListProps> = ({
  className,
  list,
  selectedChatId,
  onSelectChat,
  onLoadMore,
}) => {
  return (
    <>
      <List className={cn(className)}>
        {list.map((item) => (
          <ListItem
            onClick={() => onSelectChat(item.phoneNumberId)}
            className={'h-20 py-4'}
            selected={item.phoneNumberId === selectedChatId}
          >
            <ChatListItem item={item} key={item.phoneNumberId} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
