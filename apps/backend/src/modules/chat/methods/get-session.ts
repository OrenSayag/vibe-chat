import {
  BaseGetListParams,
  GetChatSessionParams,
  GetChatSessionResponse,
} from '@monday-whatsapp/shared-types';
import { getChatSession } from '@monday-whatsapp/db';

type Input = GetChatSessionParams & BaseGetListParams;

type Output = GetChatSessionResponse['data'];

export const getSession = (input: Input): Promise<Output> => {
  return getChatSession(input);
};
