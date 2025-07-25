import { FC } from 'react';
import { customFormatDate } from '@vibe-chat/ui-utils';
import {
  ChatListItem as ChatListItemData,
  WhatsappMessageType,
} from '@vibe-chat/shared-types';
import { Avatar as VibeAvatar, Box, Flex, Text } from '@vibe/core';
import { MessageStatusCheck } from '../../../../atoms/message-status-check';
import { MessageDirection } from 'libs/shared-types/src/lib/whatsapp/whatsapp.types';

interface Props {
  className?: string;
  item: ChatListItemData;
}

export const ChatListItem: FC<Props> = ({ className, item }) => {
  return (
    <>
      <Flex style={{ width: '100%' }} gap={'small'}>
        <Box padding={'xs'}>
          <Avatar src={item.avatarSrc} />
        </Box>
        <Box style={{ width: '100%', flexGrow: 1 }}>
          <Content name={item.name} message={item.latestMessage} />
        </Box>
      </Flex>
    </>
  );
};

function Avatar({ src }: { src?: Props['item']['avatarSrc'] }) {
  return <VibeAvatar src={src} size="medium" type="img" />;
}

function Content({
  name,
  message,
}: {
  name: Props['item']['name'];
  message: ChatListItemData['latestMessage'];
}) {
  return (
    <Box style={{ width: '100%' }}>
      <Flex justify={'space-between'} align={'end'}>
        <Text>{name}</Text>
        {message && (
          <Text>
            {customFormatDate(new Date(Number(message.timestamp) * 1_000))}
          </Text>
        )}
      </Flex>
      {message && (
        <Flex direction={'row'} align={'end'} gap={'small'}>
          <Flex>
            {message.direction === MessageDirection.OUTGOING && (
              <MessageStatusCheck status={message.status} />
            )}
          </Flex>
          {message.message.type === WhatsappMessageType.TEXT ? (
            <Text>{message.message.text.body ?? ''}</Text>
          ) : null}
        </Flex>
      )}
    </Box>
  );
}
