import {
  ChatHistory,
  ChatListProps,
  ChatSessionProps,
  GET_CHAT_SESSION_HISTORY_RESULTS_PER_PAGE,
  GetChatSessionResponse,
  GetListState,
} from '@vibe-chat/shared-types';
import { useEffect, useState } from 'react';
import { useBackendRequest } from '@vibe-chat/next-services';
import { getChatSession } from '../../../../server/chat/get-chat-session';

type Input = {
  subscriptionId?: string;
  selectedChatId?: ChatListProps['selectedChatId'];
  isNewContact?: boolean;
};

type Output = ChatSessionProps;

export const useChatSession = ({
  selectedChatId,
  subscriptionId,
  isNewContact,
}: Input): Output => {
  const [state, setState] = useState<GetListState>('loading');
  const [currPage, setCurrPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [history, setHistory] = useState<ChatHistory>();
  const { pending, startAction } = useBackendRequest<
    GetChatSessionResponse['data'],
    undefined
  >({
    apiCall: () => {
      return getChatSession({
        params: {
          subscriptionId: subscriptionId!,
          phoneNumberId: selectedChatId!,
        },
        query: {
          offset: (currPage - 1) * GET_CHAT_SESSION_HISTORY_RESULTS_PER_PAGE,
          limit: GET_CHAT_SESSION_HISTORY_RESULTS_PER_PAGE,
        },
      });
    },
    onError() {
      setState('error');
    },
    onSuccess({ history, hasMore }) {
      setState('available');
      setHistory(history);
      setHasMore(Boolean(hasMore));
    },
  });
  useEffect(() => {
    if (!selectedChatId || !subscriptionId) {
      return;
    }
    if (isNewContact) {
      setHistory({
        contact: {
          phoneNumberId: selectedChatId,
          name: selectedChatId,
        },
        history: [],
      });
      setState('available');
      return;
    }
    startAction(undefined);
  }, [selectedChatId]);
  const onLoadMore = () => {
    console.log('onLoadMore: not implemented');
  };

  if (state === 'loading' || state === 'error') {
    return {
      state,
    };
  }
  return {
    state,
    history: history!,
    onLoadMore,
    headerProps: {
      name: history!.contact.name,
      avatarSrc: history?.contact.avatarSrc,
    },
  } as Output;
};
