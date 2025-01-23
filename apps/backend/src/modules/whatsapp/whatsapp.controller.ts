import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  BackendBaseResponse,
  GreenApiNotification,
} from '@monday-whatsapp/shared-types';
import { WhatsappService } from './whatsapp.service';
import { WhatsappWebhook } from '../../decorators/whatsapp-webhook.decorator';
import { EventsService } from '../events/events.service';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly eventsService: EventsService
  ) {}
  @WhatsappWebhook()
  @Post('webhook')
  async webhook(
    @Body() input: GreenApiNotification
  ): Promise<BackendBaseResponse<undefined>> {
    console.log('Received webhook');
    console.log({
      input: JSON.stringify(input),
    });
    return {
      success: true,
      message: 'Received webhook',
      data: undefined,
    };
  }
  @WhatsappWebhook()
  @Get('webhook')
  async webhookVerify(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string
  ): Promise<string> {
    return challenge;
  }
}
