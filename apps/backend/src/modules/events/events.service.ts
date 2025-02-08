import { Injectable } from '@nestjs/common';
import {
  EventClientData,
  EventMessageContent,
  EventType,
  UpdateMessageStatusEventPayload,
} from '@monday-whatsapp/shared-types';
import { Server } from 'socket.io';
import { getSubscriptionIdByMessageId } from '@monday-whatsapp/db';

@Injectable()
export class EventsService {
  clients: Map<string, EventClientData>;
  socket: Server;

  constructor() {
    this.clients = new Map();
  }

  setClientData(id: string, data: EventClientData) {
    this.clients.set(id, {
      ...this.clients.get(id),
      ...data,
    });
    console.log({
      clients: this.clients,
    });
  }

  getClientData(id: string) {
    return this.clients.get(id);
  }

  removeClient(id: string) {
    this.clients.delete(id);
  }

  sendMessage(id: string, message: EventMessageContent) {
    console.log(`Send message to socket ${id}`);
    this.socket.to(id).emit(message.type, message);
  }

  broadcastMessageBySubscriptionId({
    subscriptionId,
    message,
  }: {
    subscriptionId: string;
    message: EventMessageContent;
  }) {
    for (const [key, value] of this.clients) {
      if (value.subscriptionId === subscriptionId) {
        this.sendMessage(key, message);
      }
    }
  }

  async broadcastMessageStatusChange(payload: UpdateMessageStatusEventPayload) {
    const { subscriptionId } = await getSubscriptionIdByMessageId({
      mid: payload.message.id,
    });
    for (const [key, value] of this.clients) {
      if (value.subscriptionId === subscriptionId) {
        this.sendMessage(key, {
          type: EventType.UPDATE_MESSAGE_STATUS,
          data: payload,
        });
      }
    }
  }
}
