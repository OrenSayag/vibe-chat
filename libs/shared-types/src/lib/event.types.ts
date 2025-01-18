import { GreenApiInstanceState } from './green-api.types';
import { z } from 'zod';

export type EventClientId =
  `subscription:${string}-greenInstance:${string}-${string}`;

export enum EventType {
  INSTANCE_STATE_CHANGED = 'instanceStateChanged',
}

export type EventMessageContent = {
  type: EventType.INSTANCE_STATE_CHANGED;
  state: string | GreenApiInstanceState;
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
