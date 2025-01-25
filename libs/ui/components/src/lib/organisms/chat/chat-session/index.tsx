import { ComponentPropsWithoutRef, FC, useMemo } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import {
  ChatHistory,
  Message,
  MessageDirection,
} from '@monday-whatsapp/shared-types';
import { Box } from '@vibe/core';
import { ChatSessionHeader } from './chat-session-header';
import { MessageInputAndAction } from '../../../molecules/message-input-and-action';
import { ChatSessionCurrentDateIndicator } from './chat-session-current-date-indicator';
import { ChatMessageBox } from './chat-message-box';

interface Props {
  className?: string;
  history: ChatHistory;
  headerProps: ComponentPropsWithoutRef<typeof ChatSessionHeader>;
  messageInputAndActionProps: ComponentPropsWithoutRef<
    typeof MessageInputAndAction
  >;
}

export const ChatSession: FC<Props> = ({
  className,
  history,
  messageInputAndActionProps,
  headerProps,
}) => {
  return (
    <>
      <Box className={cn('h-screen flex flex-col justify-between', className)}>
        <ChatSessionHeader {...headerProps} />
        <Session className={'flex-grow'} chatHistory={history} />
        <MessageInputAndAction
          {...messageInputAndActionProps}
          className={'pb-2 px-1'}
        />
      </Box>
    </>
  );
};

function Session({
  chatHistory,
  className,
}: {
  chatHistory: ChatHistory;
  className?: string;
}) {
  const grouped = useMemo(
    () => groupByDateToArrays(chatHistory.history),
    [chatHistory.history]
  );
  return (
    <Box className={cn('px-12', className)}>
      {grouped.map((g) => (
        <SessionDay messages={g} key={g[0].id} />
      ))}
    </Box>
  );
}

function SessionDay({ messages }: { messages: Message[] }) {
  return (
    <Box className={'pt-2'}>
      <ChatSessionCurrentDateIndicator
        timestamp={messages[0] ? Number(messages[0].timestamp) : Date.now()}
        className={'mx-auto'}
      />
      {messages.map((m) => (
        <ChatMessageBox
          message={m}
          key={m.id}
          className={cn(
            m.direction === MessageDirection.OUTGOING && 'ml-auto',
            m.direction === MessageDirection.INCOMING && 'mr-auto'
          )}
        />
      ))}
    </Box>
  );
}

function groupByDateToArrays(data: Message[]): Message[][] {
  const grouped = data.reduce((acc, item) => {
    const date = new Date(Number(item.timestamp)).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as Record<string, Message[]>);

  return Object.values(grouped);
}
