import { FC } from 'react';
import { cn, customFormatDate } from '@monday-whatsapp/ui-utils';
import { ChatListItem as ChatListItemData } from '@monday-whatsapp/shared-types';
import { Avatar as VibeAvatar, Box, Flex, Text } from '@vibe/core';
import { MessageStatusCheck } from '../../../../atoms/message-status-check';
import { MessageDirection } from 'libs/shared-types/src/lib/whatsapp.types';

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
  message: ChatListItemData['latestMessage'];
}) {
  return (
    <Box>
      <Flex justify={'space-between'} align={'end'}>
        <Text>{name}</Text>
        <Text>
          {customFormatDate(new Date(Number(message.timestamp) * 1_000))}
        </Text>
      </Flex>
      <Flex direction={'row'} align={'end'} gap={'small'}>
        <Flex>
          {message.direction === MessageDirection.OUTGOING && (
            <MessageStatusCheck status={message.status} />
          )}
        </Flex>
        <Text>{message.text.body ?? ''}</Text>
      </Flex>
    </Box>
  );
}
