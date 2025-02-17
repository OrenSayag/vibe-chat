import { Injectable } from '@nestjs/common';
import { saveTemplate } from './methods/save-template';
import {
  WhatsappTemplate,
  SaveTemplateRequest,
  SaveTemplateResponse,
} from '@vibe-chat/shared-types';

@Injectable()
export class WhatsappService {
  async saveTemplate(
    input: SaveTemplateRequest,
    subscriptionId: string
  ): Promise<SaveTemplateResponse['data']> {
    const { template } = await saveTemplate({
      subscriptionId,
      template: input.template as WhatsappTemplate,
      templateId: input.templateId,
    });

    return {
      id: template.id,
      name: template.name,
      status: template.status,
    };
  }
}
