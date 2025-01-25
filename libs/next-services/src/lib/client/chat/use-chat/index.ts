import { ChatProps } from '@monday-whatsapp/shared-types';
import { useChatList } from './use-chat-list';
import { useChatSession } from './use-chat-session';
import { useEffect } from 'react';

type Output = ChatProps;

type Input = {
  subscriptionId?: number;
};

export const useChat = ({ subscriptionId }: Input): Output => {
  const chatListProps = useChatList({ subscriptionId });
  const chatSessionProps = useChatSession({
    subscriptionId,
    phoneNumberId: chatListProps?.selectedChatId,
  });
  useEffect(() => {
    console.log({
      chatListProps,
    });
  }, [JSON.stringify(chatListProps)]);
  return {
    listProps: chatListProps,
    sessionProps: chatSessionProps,
    loading: chatListProps.state === 'loading',
    error: chatListProps.state === 'error',
  };
};
