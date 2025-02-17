import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  BackendBaseResponse,
  GetTemplateResponse,
  GetTemplatesResponse,
  WhatsappWebhook as IWhatsappWebhook,
  saveTemplateDraftSchema,
  SaveTemplateResponse,
  saveTemplateSchema,
} from '@vibe-chat/shared-types';
import { createZodDto } from 'nestjs-zod';
import { WhatsappWebhook } from '../../decorators/whatsapp-webhook.decorator';
import { EventsService } from '../events/events.service';
import { deleteTemplate } from './methods/delete-template';
import { getTemplate } from './methods/get-template';
import { getTemplates } from './methods/get-templates';
import { handleWebhook } from './methods/handle-webhook';
import { WhatsappService } from './whatsapp.service';
import { z } from 'zod';
class SaveTemplateDraftDto extends createZodDto(saveTemplateDraftSchema) {}
class SaveTemplateDto extends createZodDto(saveTemplateSchema) {}
class DeleteMultipleTemplatesDto extends createZodDto(
  z.object({
    templateIds: z.array(z.string()),
  })
) {}
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
  @Get('template/:subscriptionId/:templateName')
  async getTemplate(
    @Param('subscriptionId') subscriptionId: string,
    @Param('templateName') templateName: string
  ): Promise<GetTemplateResponse> {
    const template = await getTemplate({
      subscriptionId,
      templateName,
    });
    return {
      success: true,
      message: 'Successfully retrieved template',
      data: template,
    };
  }
  @Post('template/:subscriptionId')
  async saveTemplate(
    @Body() input: SaveTemplateDto,
    @Param('subscriptionId') subscriptionId: string
  ): Promise<SaveTemplateResponse> {
    const result = await this.whatsappService.saveTemplate(
      input,
      subscriptionId
    );
    return {
      success: true,
      message: 'Template saved successfully',
      data: result,
    };
  }
  @Delete('template/:subscriptionId/:templateId')
  async deleteTemplate(
    @Param('subscriptionId') subscriptionId: string,
    @Param('templateId') templateId: string
  ): Promise<BackendBaseResponse<undefined>> {
    await deleteTemplate({
      subscriptionId,
      templateName: templateId,
    });
    return {
      success: true,
      message: 'Template deleted successfully',
      data: undefined,
    };
  }
  @Post('template/:subscriptionId/delete-multiple')
  async deleteMultipleTemplates(
    @Param('subscriptionId') subscriptionId: string,
    @Body() input: DeleteMultipleTemplatesDto
  ): Promise<BackendBaseResponse<undefined>> {
    await Promise.all(
      input.templateIds.map((templateId) =>
        deleteTemplate({
          subscriptionId,
          templateName: templateId,
        })
      )
    );
    return {
      success: true,
      message: 'Templates deleted successfully',
      data: undefined,
    };
  }
  @Delete('template/:subscriptionId/name/:templateName')
  async deleteTemplateByName(
    @Param('subscriptionId') subscriptionId: string,
    @Param('templateName') templateName: string
  ): Promise<BackendBaseResponse<undefined>> {
    await deleteTemplate({
      subscriptionId,
      templateName,
    });
    return {
      success: true,
      message: 'Template deleted successfully',
      data: undefined,
    };
  }
}
