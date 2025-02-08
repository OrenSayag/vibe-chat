import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  BackendBaseResponse,
  GetTemplatesResponse,
  WhatsappWebhook as IWhatsappWebhook,
} from '@monday-whatsapp/shared-types';
import { WhatsappService } from './whatsapp.service';
import { WhatsappWebhook } from '../../decorators/whatsapp-webhook.decorator';
import { EventsService } from '../events/events.service';
import { handleWebhook } from './methods/handle-webhook';
import { getTemplates } from './methods/get-templates';

@Controller('whatsapp')
export class WhatsappController {
  constructor(
    private readonly whatsappService: WhatsappService,
    private readonly eventsService: EventsService
  ) {}
  @WhatsappWebhook()
  @Post('webhook')
  async webhook(
    @Body() input: IWhatsappWebhook
  ): Promise<BackendBaseResponse<undefined>> {
    handleWebhook({ data: input, eventsService: this.eventsService });
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
  @Get('templates/:subscriptionId')
  async getSubscriptionTemplates(
    @Param('subscriptionId') subscriptionId: string
  ): Promise<GetTemplatesResponse> {
    const templates = await getTemplates({
      subscriptionId,
    });
    return {
      success: true,
      message: 'Successfully retrieved templates',
      data: templates.templates,
    };
  }
}
