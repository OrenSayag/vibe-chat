import { Injectable } from '@nestjs/common';
import {
  EventClientData,
  EventMessageContent,
} from '@monday-whatsapp/shared-types';
import { Server } from 'socket.io';

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

  sendMessage(id: string, message: EventMessageContent) {
    console.log(`Send message to socket ${id}`);
    this.socket.to(id).emit(message.type, message);
  }

  broadcastMessageByGreenInstanceId({
    instanceId,
    message,
  }: {
    instanceId: number;
    message: EventMessageContent;
  }) {
    for (const [key, value] of this.clients) {
      if (value.greenInstanceId === instanceId) {
        this.sendMessage(key, message);
      }
    }
  }
}
