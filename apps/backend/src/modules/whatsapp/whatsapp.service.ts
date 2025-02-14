import { Injectable } from '@nestjs/common';
import { getTemplateDraft } from './methods/get-template-draft';
import { getTemplateDrafts } from './methods/get-template-drafts';
import { saveTemplateDraft } from './methods/save-template-draft';
import { WhatsappTemplate } from '@vibe-chat/shared-types';

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
}
