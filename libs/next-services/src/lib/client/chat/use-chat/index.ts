import { ChatProps } from '@monday-whatsapp/shared-types';
import { useChatList } from './use-chat-list';
import { useChatSession } from './use-chat-session';
import { useChatEvents } from './use-chat-events';

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
  const { sessionHistory, list, sendMessage } = useChatEvents({
    list: chatListProps.list,
    subscriptionId,
    sessionHistory:
      chatSessionProps.state === 'available'
        ? chatSessionProps.history
        : undefined,
  });

  return {
    listProps: { ...chatListProps, list },
    sessionProps:
      chatSessionProps.state === 'available' && sessionHistory
        ? {
            ...chatSessionProps,
            history: sessionHistory,
            messageInputAndActionProps: {
              ...chatSessionProps.messageInputAndActionProps,
              onSend(txt: string) {
                sendMessage({
                  chatIds: [chatListProps.selectedChatId!],
                  message: txt,
                });
              },
            },
          }
        : undefined,
    loading: chatListProps.state === 'loading',
    error: chatListProps.state === 'error',
  };
};
