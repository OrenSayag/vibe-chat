import {
  ChatListItem,
  ChatListProps,
  GET_CHAT_LIST_RESULTS_PER_PAGE,
  GetChatListResponse,
  GetListState,
} from '@vibe-chat/shared-types';
import { useEffect, useState } from 'react';
import { useBackendRequest } from '@vibe-chat/next-services';
import { getChatList } from '../../../../server/chat/get-chat-list';

type Input = {
  subscriptionId?: string;
};

type Output = ChatListProps;

export const useChatList = ({ subscriptionId }: Input): Output => {
  const [state, setState] = useState<GetListState>('loading');
  const [currPage, setCurrPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [list, setList] = useState<ChatListItem[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string>();
  const { pending, startAction } = useBackendRequest<
    GetChatListResponse['data'],
    undefined
  >({
    apiCall: () =>
      getChatList({
        params: {
          subscriptionId: subscriptionId!,
        },
        query: {
          offset: (currPage - 1) * GET_CHAT_LIST_RESULTS_PER_PAGE,
          limit: GET_CHAT_LIST_RESULTS_PER_PAGE,
        },
      }),
    onError() {
      console.log('Error getting the chat list!');
      setState('error');
    },
    onSuccess({ list, hasMore }) {
      setState('available');
      setList(list);
      setHasMore(Boolean(hasMore));
    },
  });
  useEffect(() => {
    if (subscriptionId) {
      startAction(undefined);
    }
  }, [subscriptionId]);
  const onLoadMore = () => {
    console.log('onLoadMore: not implemented');
  };

  return {
    list,
    onSelectChat: (chatid) => {
      const contactExists = list.some((i) => i.phoneNumberId == chatid);
      if (!contactExists) {
        setList((prev) => [
          ...prev,
          {
            name: chatid,
            phoneNumberId: chatid,
            displayPhoneNumber: chatid,
          },
        ]);
      }
      setSelectedChatId(chatid);
    },
    selectedChatId,
    onLoadMore,
    state,
  };
};
