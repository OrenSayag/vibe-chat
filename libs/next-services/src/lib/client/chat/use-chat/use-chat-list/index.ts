import { ChatListProps } from '@monday-whatsapp/shared-types';

type Input = {
  subscriptionId: number;
};

type Output = {
  state: 'loading' | 'error' | 'available';
  list?: ChatListProps;
};

export const useChatList = ({ subscriptionId }: Input): Output => {
  return {};
};
