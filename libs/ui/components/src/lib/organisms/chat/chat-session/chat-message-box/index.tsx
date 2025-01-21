import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import {
  ChatMessage,
  MessageType,
  StatusMessage,
} from '@monday-whatsapp/shared-types';
import { Box, Flex, Text } from '@vibe/core';
import { format } from 'date-fns';
import { MessageStatusCheck } from '../../../../atoms/message-status-check';

interface Props {
  className?: string;
  message: ChatMessage;
}

export const ChatMessageBox: FC<Props> = ({ className, message }) => {
  return (
    <>
      <Box
        className={cn(
          message.type === MessageType.Incoming && 'bg-stone-600',
          message.type === MessageType.Outgoing && 'bg-lime-700',
          'bg-opacity-20 p-2 rounded-md w-fit',
          className
        )}
      >
        <Content
          text={message.textMessage ?? message.extendedTextMessage?.text ?? ''}
        />
        <Flex gap={'xs'} justify={'end'}>
          <Timestamp timestamp={message.timestamp} />
          {message.type === MessageType.Outgoing && (
            <Checks status={message.statusMessage} />
          )}
        </Flex>
      </Box>
    </>
  );
};

function Timestamp({
  timestamp,
  className,
}: {
  className?: string;
  timestamp: Props['message']['timestamp'];
}) {
  return <Text>{format(timestamp * 1_000, 'HH:mm')}</Text>;
}

function Checks({
  status,
  className,
}: {
  className?: string;
  status: StatusMessage;
}) {
  return (
    <Box className={cn(className)}>
      <MessageStatusCheck status={status} />
    </Box>
  );
}

function Content({ text, className }: { className?: string; text: string }) {
  return (
    <Box className={cn(className)}>
      <Text>{text}</Text>
    </Box>
  );
}

function MediaContent({ className }: { className?: string }) {
  return (
    <Box className={cn(className)}>
      <Text>not implemented</Text>
    </Box>
  );
}
function ReplyContent({ className }: { className?: string }) {
  return (
    <Box className={cn(className)}>
      <Text>not implemented</Text>
    </Box>
  );
}
