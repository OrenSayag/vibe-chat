import { FC } from 'react';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@vibe-chat/components';
import { Box, Divider, Flex, Heading } from '@vibe/core';
import { ChatMasterHeaderProps } from '@vibe-chat/shared-types';

export const ChatMasterHeader: FC<ChatMasterHeaderProps> = ({ onNewChat }) => {
  return (
    <>
      <Flex
        justify={'space-between'}
        align={'center'}
        style={{
          padding: '.7em .4em',
        }}
      >
        <Heading type={'h3'}>Chats</Heading>
        <Box>
          <NewChatButton onNewChat={onNewChat} />
        </Box>
      </Flex>
      <Divider />
    </>
  );
};

function NewChatButton({
  onNewChat,
}: {
  onNewChat: ChatMasterHeaderProps['onNewChat'];
}) {
  return (
    <Button onClick={onNewChat} size={'small'}>
      <MessageSquarePlus size={20} />
    </Button>
  );
}
