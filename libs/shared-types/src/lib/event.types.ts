import { z } from 'zod';
import { Message } from './whatsapp.types';

export type EventClientId = `subscription:${string}-${string}`;

export enum EventType {
  SEND_TEXT_MESSAGE = 'sendTextMessage',
  UPDATE_MESSAGE_STATUS = 'updateMessageStatus',
}

export type UpdateMessageStatusEventPayload = {
  message: Message;
  contactPhoneNumberId: string;
};

export type EventMessageContent =
  | {
      type: EventType.SEND_TEXT_MESSAGE;
      data: SendMessageRequest;
    }
  | {
      type: EventType.UPDATE_MESSAGE_STATUS;
      data: UpdateMessageStatusEventPayload;
    };

export type EventClientData = {
  subscriptionId: number;
};

export const sendMessageRequestSchema = z.object({
  chatIds: z.array(z.string()),
  message: z.string(),
});

export type SendMessageRequest = z.infer<typeof sendMessageRequestSchema>;
