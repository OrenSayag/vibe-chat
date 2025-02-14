import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  BackendBaseResponse,
  GetTemplateDraftResponse,
  GetTemplateDraftsResponse,
  GetTemplatesResponse,
  WhatsappWebhook as IWhatsappWebhook,
  SaveTemplateDraftResponse,
  saveTemplateDraftSchema,
  WhatsappTemplate,
} from '@vibe-chat/shared-types';
import { createZodDto } from 'nestjs-zod';
import { WhatsappWebhook } from '../../decorators/whatsapp-webhook.decorator';
import { EventsService } from '../events/events.service';
import { getTemplates } from './methods/get-templates';
import { handleWebhook } from './methods/handle-webhook';
import { WhatsappService } from './whatsapp.service';

class SaveTemplateDraftDto extends createZodDto(saveTemplateDraftSchema) {}

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
  @Get('template-draft/:name')
  async getTemplateDraft(
    @Param('name') name: string
  ): Promise<GetTemplateDraftResponse> {
    const result = await this.whatsappService.getTemplateDraft(name);
    return {
      success: true,
      message: 'Template draft retrieved successfully',
      data: result.template,
    };
  }
  @Get('template-drafts')
  async getTemplateDrafts(): Promise<GetTemplateDraftsResponse> {
    const result = await this.whatsappService.getTemplateDrafts();
    return {
      success: true,
      message: 'Template drafts retrieved successfully',
      data: result.templates,
    };
  }
  @Post('template-draft')
  async saveTemplateDraft(
    @Body() input: SaveTemplateDraftDto
  ): Promise<SaveTemplateDraftResponse> {
    const { id } = await this.whatsappService.saveTemplateDraft({
      ...input.template,
    } as unknown as WhatsappTemplate);
    return {
      success: true,
      message: 'Template draft saved successfully',
      data: { id },
    };
  }
}
