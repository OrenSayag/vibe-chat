import {
  BaseGetListParams,
  GetChatListParams,
  GetChatListResponse,
} from '@monday-whatsapp/shared-types';
import { getChatList } from '@monday-whatsapp/db';

type Input = GetChatListParams & BaseGetListParams;

type Output = GetChatListResponse['data'];

export const getList = (input: Input): Promise<Output> => {
  return getChatList(input);
};
