import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { ChatListItem as ChatListItemData } from '@monday-whatsapp/shared-types';
import { List, ListItem } from '@vibe/core';
import { ChatListItem } from './chat-list-item';

interface Props {
  className?: string;
  onLoadMore?(): void;
  list: ChatListItemData[];
  selectedChatId?: string;
  onSelectChat(id: string): void;
}

export const ChatList: FC<Props> = ({
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
            onClick={() => onSelectChat(item.chatId)}
            className={'h-20 py-4'}
            selected={item.chatId === selectedChatId}
          >
            <ChatListItem item={item} key={item.chatId} />
          </ListItem>
        ))}
      </List>
    </>
  );
};
