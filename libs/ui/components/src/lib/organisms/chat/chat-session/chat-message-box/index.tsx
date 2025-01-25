import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Box, Flex, Text } from '@vibe/core';
import { format } from 'date-fns';
import { MessageStatusCheck } from '../../../../atoms/message-status-check';
import {
  Message,
  MessageDirection,
  MessageStatus,
} from '@monday-whatsapp/shared-types';

interface Props {
  className?: string;
  message: Message;
}

export const ChatMessageBox: FC<Props> = ({ className, message }) => {
  return (
    <>
      <Box
        className={cn(
          message.direction === MessageDirection.INCOMING && 'bg-stone-600',
          message.direction === MessageDirection.OUTGOING && 'bg-lime-700',
          'bg-opacity-20 p-2 rounded-md w-fit',
          className
        )}
      >
        <Content text={message.text.body ?? ''} />
        <Flex gap={'xs'} justify={'end'}>
          <Timestamp timestamp={message.timestamp} />
          {message.direction === MessageDirection.OUTGOING && (
            <Checks status={message.status} />
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
  return <Text>{format(Number(timestamp) * 1_000, 'HH:mm')}</Text>;
}

function Checks({
  status,
  className,
}: {
  className?: string;
  status: MessageStatus;
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
