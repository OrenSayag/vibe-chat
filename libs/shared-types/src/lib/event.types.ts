import { GreenApiInstanceState } from './green-api.types';
import { z } from 'zod';

export type EventClientId =
  `subscription:${string}-greenInstance:${string}-${string}`;

export enum EventType {
  INSTANCE_STATE_CHANGED = 'instanceStateChanged',
  SEND_TEXT_MESSAGE = 'sendTextMessage',
}

export type EventMessageContent =
  | {
      type: EventType.INSTANCE_STATE_CHANGED;
      state: string | GreenApiInstanceState;
    }
  | {
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
