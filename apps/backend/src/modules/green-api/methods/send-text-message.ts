import {
  GreenApiInstanceInfo,
  SendMessageRequest,
} from '@monday-whatsapp/shared-types';
import { getClient } from './get-client';

type Input = {
  data: SendMessageRequest;
  instanceInfo: GreenApiInstanceInfo;
};

export const sendTextMessage = async ({ instanceInfo, data }: Input) => {
  const restAPI = getClient(instanceInfo);

  await Promise.all(data.chatIds.map((chatId) => send(chatId, data.message)));

  function send(chatId: string, content: string) {
    restAPI.message.sendMessage(chatId, undefined, content);
  }
};
