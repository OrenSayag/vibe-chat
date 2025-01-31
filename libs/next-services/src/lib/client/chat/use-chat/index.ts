import { ChatProps } from '@monday-whatsapp/shared-types';
import { useChatList } from './use-chat-list';
import { useChatSession } from './use-chat-session';
import { useChatEvents } from './use-chat-events';
import { useNewChatModal } from './use-new-chat-modal';
import { isBefore, subHours } from 'date-fns';
import { useEffect } from 'react';

type Output = ChatProps;

type Input = {
  subscriptionId?: number;
};

export const useChat = ({ subscriptionId }: Input): Output => {
  const chatListProps = useChatList({ subscriptionId });
  const chatSessionProps = useChatSession({
    subscriptionId,
    selectedChatId: chatListProps?.selectedChatId,
    isNewContact: !chatListProps.list.find(
      (i) => i.phoneNumberId == chatListProps?.selectedChatId
    )?.latestMessage,
  });
  const { sessionHistory, list, sendMessage } = useChatEvents({
    list: chatListProps.list,
    subscriptionId,
    sessionHistory:
      chatSessionProps.state === 'available'
        ? chatSessionProps.history
        : undefined,
  });

  const { onOpen: onOpenNewChatModal, ...newChatModalProps } = useNewChatModal({
    onNewChat: chatListProps.onSelectChat,
  });

  useEffect(() => {
    console.log({
      chatSessionProps,
      sessionHistory,
    });
  }, [chatSessionProps, sessionHistory]);

  return {
    listProps: { ...chatListProps, list },
    sessionProps:
      chatSessionProps.state === 'available' && sessionHistory
        ? {
            ...chatSessionProps,
            history: sessionHistory,
            messageInputAndActionProps: {
              ...chatSessionProps.messageInputAndActionProps,
              onSend(input) {
                if (input.type === 'text') {
                  sendMessage({
                    to: chatListProps.selectedChatId!,
                    ...input,
                  });
                }
              },
              templatesOnly:
                !sessionHistory.history?.[0]?.timestamp ||
                isBefore(
                  Number(sessionHistory.history?.[0].timestamp) * 1_000,
                  subHours(new Date(), 24)
                ),
            },
          }
        : undefined,
    masterHeaderProps: {
      onNewChat() {
        onOpenNewChatModal();
      },
    },
    newChatModalProps,
    loading: chatListProps.state === 'loading',
    error: chatListProps.state === 'error',
  };
};
