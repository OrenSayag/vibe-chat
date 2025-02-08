import { ChatProps, MessageDirection } from '@vibe-chat/shared-types';
import { useChatList } from './use-chat-list';
import { useChatSession } from './use-chat-session';
import { useChatEvents } from './use-chat-events';
import { useNewChatModal } from './use-new-chat-modal';
import { useMessageInputAndAction } from './use-message-input-and-action';

type Output = ChatProps;

type Input = {
  subscriptionId?: string;
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

  const messageInputAndActionProps = useMessageInputAndAction({
    subscriptionId,
    onSend: sendMessage,
    latestMessage: sessionHistory?.history?.filter(
      (m) => m.direction === MessageDirection.INCOMING
    )?.[0],
  });

  return {
    listProps: { ...chatListProps, list },
    sessionProps:
      chatSessionProps.state === 'available' && sessionHistory
        ? {
            ...chatSessionProps,
            history: sessionHistory,
            messageInputAndActionProps,
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
