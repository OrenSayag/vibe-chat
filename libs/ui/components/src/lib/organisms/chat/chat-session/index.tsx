import { FC, useEffect, useMemo, useRef } from 'react';
import {
  ChatHistory,
  ChatSessionProps,
  Message,
} from '@monday-whatsapp/shared-types';
import { Box, Text } from '@vibe/core';
import { ChatSessionHeader } from './chat-session-header';
import { MessageInputAndAction } from '../../../molecules/message-input-and-action';
import { ChatSessionCurrentDateIndicator } from './chat-session-current-date-indicator';
import { ChatMessageBox } from './chat-message-box';

export const ChatSession: FC<ChatSessionProps> = (props) => {
  const { state, className } = props;
  return (
    <>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'between',
          height: '100%',
        }}
      >
        {state === 'error' && <Text>Error</Text>}
        {state === 'loading' && <Text>Loading chat session</Text>}
        {state === 'available' && (
          <>
            <ChatSessionHeader {...props.headerProps} />
            <Session chatHistory={props.history} />
            <MessageInputAndAction
              {...props.messageInputAndActionProps}
              style={{
                padding: '1em 1em',
              }}
            />
          </>
        )}
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
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }, [ref.current, chatHistory]);
  return (
    <Box
      style={{
        flexGrow: 1,
        padding: '.5em 2em',
        overflowY: 'scroll',
        background: 'rgba(22, 161, 247, 0.1)',
        flexDirection: 'column-reverse',
        height: '100%',
      }}
    >
      {grouped.map((g) => (
        <SessionDay messages={g} key={g[0].id} />
      ))}

      <div ref={ref} style={{ float: 'left', clear: 'both' }} />
    </Box>
  );
}

function SessionDay({ messages }: { messages: Message[] }) {
  return (
    <Box className={'pt-2'}>
      <ChatSessionCurrentDateIndicator
        timestamp={messages[0] ? Number(messages[0].timestamp) : Date.now()}
      />
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: '1em',
        }}
      >
        {messages.map((m) => (
          <ChatMessageBox message={m} key={m.id} />
        ))}
      </Box>
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
