import {
  BaseGetListParams,
  GetChatListParams,
  GetChatListResponse,
} from '@vibe-chat/shared-types';
import { getChatList } from '@vibe-chat/db';

type Input = GetChatListParams & BaseGetListParams;

type Output = GetChatListResponse['data'];

export const getList = (input: Input): Promise<Output> => {
  return getChatList(input);
};
