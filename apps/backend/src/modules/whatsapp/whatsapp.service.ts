import { Injectable } from '@nestjs/common';
import { getTemplateDraft } from './methods/get-template-draft';
import { getTemplateDrafts } from './methods/get-template-drafts';
import { saveTemplateDraft } from './methods/save-template-draft';
import { saveTemplate } from './methods/save-template';
import {
  WhatsappTemplate,
  SaveTemplateRequest,
  SaveTemplateResponse,
} from '@vibe-chat/shared-types';

@Injectable()
export class WhatsappService {
  async getTemplateDraft(name: string) {
    return getTemplateDraft({ name });
  }

  async getTemplateDrafts() {
    return getTemplateDrafts();
  }

  async saveTemplateDraft(template: WhatsappTemplate) {
    const { id } = await saveTemplateDraft({ template });
    return { id };
  }

  async saveTemplate(
    input: SaveTemplateRequest
  ): Promise<SaveTemplateResponse['data']> {
    const { template } = await saveTemplate({
      subscriptionId: input.subscriptionId,
      template: input.template as WhatsappTemplate,
    });

    return {
      id: template.id,
      name: template.name,
      status: template.status,
    };
  }
}
