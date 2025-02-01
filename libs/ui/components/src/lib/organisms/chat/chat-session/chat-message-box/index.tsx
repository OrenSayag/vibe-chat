import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Box, Flex, Text } from '@vibe/core';
import { format } from 'date-fns';
import { MessageStatusCheck } from '../../../../atoms/message-status-check';
import {
  Message,
  MessageDirection,
  MessageStatus,
  WhatsappMessageType,
  WhatsappTemplate,
} from '@monday-whatsapp/shared-types';
import { TemplateMessage } from './template-message';

interface Props {
  className?: string;
  message: Message;
  template?: WhatsappTemplate;
}

export const ChatMessageBox: FC<Props> = ({ className, message, template }) => {
  return (
    <>
      <Box
        style={{
          backgroundColor:
            message.direction === MessageDirection.OUTGOING
              ? 'rgba(18, 184, 60, .4)'
              : 'rgba(0, 0, 0, .1)',
          padding: '.5em .9em',
          width: 'fit-content',
          maxWidth: '30em',
          marginRight:
            message.direction === MessageDirection.INCOMING
              ? 'auto'
              : undefined,
          marginLeft:
            message.direction === MessageDirection.OUTGOING
              ? 'auto'
              : undefined,
          display: 'flex',
          alignItems: 'end',
          gap: '.5em',
        }}
        rounded={'medium'}
      >
        {message.message.type === WhatsappMessageType.TEXT && (
          <TextContent text={message.message.text.body ?? ''} />
        )}
        {message.message.type === WhatsappMessageType.TEMPLATE && template && (
          <TemplateMessage template={template} />
        )}
        <Flex gap={'xs'} justify={'end'} align={'end'}>
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
  return (
    <Text style={{ fontSize: '.7em' }}>
      {format(Number(timestamp) * 1_000, 'HH:mm')}
    </Text>
  );
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

function TextContent({
  text,
  className,
}: {
  className?: string;
  text: string;
}) {
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
