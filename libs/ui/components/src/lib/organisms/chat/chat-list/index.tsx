import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { ChatListItem } from '@monday-whatsapp/shared-types';

interface Props {
  className?: string;
  onLoadMore?(): void;
  list: ChatListItem[];
}

export const ChatList: FC<Props> = ({ className }) => {
  return (
    <>
      <div className={cn(className)}>Chat works!</div>
    </>
  );
};
