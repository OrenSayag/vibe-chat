import { z } from 'zod';

export type EventClientId = `subscription:${string}-${string}`;

export enum EventType {
  SEND_TEXT_MESSAGE = 'sendTextMessage',
}

export type EventMessageContent = {
  type: EventType.SEND_TEXT_MESSAGE;
  data: SendMessageRequest;
};

export type EventClientData = {
  subscriptionId: number;
  greenInstanceId?: number;
};

export const sendMessageRequestSchema = z.object({
  chatIds: z.array(z.string()),
  message: z.string(),
});

export type SendMessageRequest = z.infer<typeof sendMessageRequestSchema>;
