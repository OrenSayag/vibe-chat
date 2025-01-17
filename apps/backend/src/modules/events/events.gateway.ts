import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventMessageContent } from '@monday-whatsapp/shared-types';
import { EventsService } from './events.service';
import { getSubscription } from '../subscription/methods/get-subscription';

@WebSocketGateway(3002)
export class EventsGateway {
  constructor(private readonly eventsService: EventsService) {}

  @WebSocketServer()
  io: Server;

  afterInit() {
    this.eventsService.socket = this.io;
  }

  async handleConnection(client: Socket) {
    try {
      const { sockets } = this.io.sockets;

      const url = client.request.url;

      const queryString = url!.split('?')[1];

      const params = new URLSearchParams(queryString);

      const subscriptionId = params.get('subscriptionId');

      let greenApiInstanceId: string | undefined = undefined;

      const validation = async () => {
        if (Number.isNaN(Number(subscriptionId))) {
          throw new Error('invalid subscriptionId');
        }
        const { greenApiInstanceInfo } = await getSubscription({
          type: 'subscriptionId',
          id: Number(subscriptionId),
        });
        greenApiInstanceId = greenApiInstanceInfo?.instanceId;
      };

      await validation();

      console.log(`Client id: ${client.id} connected`);

      this.eventsService.setClientData(client.id, {
        subscriptionId: Number(subscriptionId),
        greenInstanceId: greenApiInstanceId
          ? Number(greenApiInstanceId)
          : undefined,
      });

      console.debug(`Number of connected clients: ${sockets.size}`);
    } catch (e) {
      console.log('Failed web socket connection.');
      console.error(e);
      client.disconnect();
    }
  }

  handleDisconnect(client: any) {
    console.log(`Client id:${client.id} disconnected`);
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() message: EventMessageContent) {
    console.log('Message received from socket.');
    console.log({
      message,
    });
  }
}
