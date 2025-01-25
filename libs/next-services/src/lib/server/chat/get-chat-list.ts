import {
  BaseGetListParams,
  GetChatListParams,
  GetChatListResponse,
} from '@monday-whatsapp/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';

type Input = {
  params: GetChatListParams;
  query: BaseGetListParams;
};

type Output = GetChatListResponse;

export const getChatList = async ({
  params: { subscriptionId },
  query,
}: Input): Promise<Output> => {
  const res = await sendRequestToServer<GetChatListResponse['data']>({
    path: `chat/${subscriptionId}/list?${new URLSearchParams({
      ...query,
    } as unknown as Record<string, string>).toString()}`,
    options: {},
  });
  if (!res.success) {
    throw new Error('Failed to get chat list');
  }
  const resData = res;
  return resData;
};
