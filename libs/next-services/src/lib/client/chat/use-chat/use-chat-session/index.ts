import {
  ChatHistory,
  ChatSessionProps,
  GET_CHAT_SESSION_HISTORY_RESULTS_PER_PAGE,
  GetChatSessionResponse,
  GetListState,
} from '@monday-whatsapp/shared-types';
import { useEffect, useState } from 'react';
import { useBackendRequest } from '@monday-whatsapp/next-services';
import { getChatSession } from '../../../../server/chat/get-chat-session';

type Input = {
  subscriptionId?: number;
  phoneNumberId?: string;
};

type Output = ChatSessionProps;

export const useChatSession = ({
  phoneNumberId,
  subscriptionId,
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
          phoneNumberId: phoneNumberId!,
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
    if (!phoneNumberId || !subscriptionId) {
      return;
    }
    startAction(undefined);
  }, [phoneNumberId]);
  const onLoadMore = () => {
    console.log('onLoadMore: not implemented');
  };
  const onSendMessage = () => {
    console.log('onSendMessage: not implemented');
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
    },
    messageInputAndActionProps: {
      type: 'text',
      onSend: onSendMessage,
    },
  };
};
