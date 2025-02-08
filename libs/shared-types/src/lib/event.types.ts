import { Message } from './whatsapp/whatsapp.types';
import { SendMessageRequest } from './whatsapp/whatsapp-messages.types';

export type EventClientId = `subscription:${string}-${string}`;

export enum EventType {
  SEND_MESSAGE = 'sendMessage',
  UPDATE_MESSAGE_STATUS = 'updateMessageStatus',
}

export type UpdateMessageStatusEventPayload = {
  message: Message;
  contactPhoneNumberId: string;
};

export type EventMessageContent =
  | {
      type: EventType.SEND_MESSAGE;
      data: SendMessageRequest;
    }
  | {
      type: EventType.UPDATE_MESSAGE_STATUS;
      data: UpdateMessageStatusEventPayload;
    };

export type EventClientData = {
  subscriptionId: string;
};
