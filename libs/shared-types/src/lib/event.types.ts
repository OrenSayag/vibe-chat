import { z } from 'zod';
import { MessageStatus } from './whatsapp.types';

export type EventClientId = `subscription:${string}-${string}`;

export enum EventType {
  SEND_TEXT_MESSAGE = 'sendTextMessage',
  UPDATE_MESSAGE_STATUS = 'updateMessageStatus',
}

export type EventMessageContent =
  | {
      type: EventType.SEND_TEXT_MESSAGE;
      data: SendMessageRequest;
    }
  | {
      type: EventType.UPDATE_MESSAGE_STATUS;
      data: {
        mid: string;
        status: MessageStatus;
      };
    };

export type EventClientData = {
  subscriptionId: number;
};

export const sendMessageRequestSchema = z.object({
  chatIds: z.array(z.string()),
  message: z.string(),
});

export type SendMessageRequest = z.infer<typeof sendMessageRequestSchema>;
