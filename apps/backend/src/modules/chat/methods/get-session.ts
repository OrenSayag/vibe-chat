import {
  BaseGetListParams,
  GetChatSessionParams,
  GetChatSessionResponse,
} from '@vibe-chat/shared-types';
import { getChatSession } from '@vibe-chat/db';

type Input = GetChatSessionParams & BaseGetListParams;

type Output = GetChatSessionResponse['data'];

export const getSession = (input: Input): Promise<Output> => {
  return getChatSession(input);
};
