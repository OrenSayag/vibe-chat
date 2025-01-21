import { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { ChatList } from '../chat-list';
import { ChatSession } from '../chat-session';
import { ChatSessionPlaceholder } from '../chat-session-placeholder';

interface Props {
  className?: string;
  listProps: ComponentPropsWithoutRef<typeof ChatList>;
  sessionProps?: ComponentPropsWithoutRef<typeof ChatSession>;
}

export const ChatLayout: FC<Props> = ({
  className,
  sessionProps,
  listProps,
}) => {
  return (
    <>
      <div className={cn('flex', className)}>
        <ChatList {...listProps} />
        {sessionProps && (
          <ChatSession {...sessionProps} className={'flex-grow'} />
        )}
        {!sessionProps && <ChatSessionPlaceholder />}
      </div>
    </>
  );
};
