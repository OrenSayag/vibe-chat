import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  EventMessageContent,
  EventType,
  SendMessageRequest,
} from '@vibe-chat/shared-types';
import { EventsService } from './events.service';
import { getSubscription } from '../subscription/methods/get-subscription';
import { sendMessage } from '../whatsapp/methods/send-message';

@WebSocketGateway(3002, {
  cors: true,
})
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

      const validation = async () => {
        if (!subscriptionId) {
          throw new Error('missing subscriptionId');
        }
        await getSubscription({
          type: 'subscriptionId',
          id: subscriptionId,
        });
      };

      await validation();

      console.log(`Client id: ${client.id} connected`);

      this.eventsService.setClientData(client.id, {
        subscriptionId: subscriptionId!,
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
    this.eventsService.removeClient(client.id);
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() message: EventMessageContent) {
    console.log('Message received from socket.');
    console.log({
      message,
    });
  }

  @SubscribeMessage(EventType.SEND_MESSAGE)
  async handleSendMessage(
    @MessageBody() message: SendMessageRequest,
    @ConnectedSocket() client: Socket
  ) {
    try {
      const { subscriptionId } = this.eventsService.getClientData(client.id)!;
      console.log({
        message,
      });
      const sentMessage = await sendMessage({
        subscriptionId,
        sendMessageData: message,
      });
      return sentMessage;
    } catch (e) {
      console.log('Error in socket handleSendTextMessage');
      console.log(e);
    }
  }
}
