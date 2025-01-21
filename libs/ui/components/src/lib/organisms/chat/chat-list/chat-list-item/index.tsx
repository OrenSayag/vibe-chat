import { FC } from 'react';
import { cn, customFormatDate } from '@monday-whatsapp/ui-utils';
import {
  ChatListItem as ChatListItemData,
  MessageType,
  StatusMessage,
} from '@monday-whatsapp/shared-types';
import { Avatar as VibeAvatar, Box, Flex, Text } from '@vibe/core';
import { CheckCheck } from 'lucide-react';

interface Props {
  className?: string;
  item: ChatListItemData;
}

export const ChatListItem: FC<Props> = ({ className, item }) => {
  return (
    <>
      <div className={cn('w-full', className)}>
        <Flex>
          <Box padding={'medium'}>
            <Avatar src={item.avatarSrc} />
          </Box>
          <Box style={{ width: '100%' }}>
            <Content name={item.name} message={item.latestMessage} />
          </Box>
        </Flex>
      </div>
    </>
  );
};

function Avatar({ src }: { src?: Props['item']['avatarSrc'] }) {
  return <VibeAvatar src={src} size="large" type="img" />;
}

function Content({
  name,
  message,
}: {
  name: Props['item']['name'];
  message: Props['item']['latestMessage'];
}) {
  return (
    <Box>
      <Flex justify={'space-between'} align={'end'}>
        <Text>{name}</Text>
        <Text>{customFormatDate(new Date(message.timestamp * 1_000))}</Text>
      </Flex>
      <Flex direction={'row'} align={'end'} gap={'small'}>
        <Flex>
          <Text
            style={{
              color:
                message.type === MessageType.Outgoing &&
                message.statusMessage === StatusMessage.Delivered
                  ? 'blue'
                  : undefined,
              opacity: !(
                message.type === MessageType.Outgoing &&
                (message.statusMessage === StatusMessage.Sent ||
                  message.statusMessage === StatusMessage.Delivered)
              )
                ? '0%'
                : undefined,
            }}
          >
            <CheckCheck size={15} />
          </Text>
        </Flex>
        <Text>
          {message.textMessage ?? message.extendedTextMessage?.text ?? ''}
        </Text>
      </Flex>
    </Box>
  );
}
