import {
  BaseGetListParams,
  GetChatSessionParams,
  GetChatSessionResponse,
} from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';

type Input = {
  params: GetChatSessionParams;
  query: BaseGetListParams;
};

type Output = GetChatSessionResponse;

export const getChatSession = async ({
  params: { subscriptionId, phoneNumberId },
  query,
}: Input): Promise<Output> => {
  const res = await sendRequestToServer<GetChatSessionResponse['data']>({
    path: `chat/${subscriptionId}/session/${phoneNumberId}?${new URLSearchParams(
      {
        ...query,
      } as unknown as Record<string, string>
    ).toString()}`,
    options: {},
  });
  if (!res.success) {
    throw new Error('Failed to get chat session');
  }
  const resData = res;
  return resData;
};
