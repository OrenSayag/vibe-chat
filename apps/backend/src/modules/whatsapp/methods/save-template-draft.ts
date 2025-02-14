import { WhatsappTemplate } from '@vibe-chat/shared-types';
import { saveTemplateDraft as saveTemplateDraftDb } from '@vibe-chat/db';

type Input = {
  template: WhatsappTemplate;
};

export const saveTemplateDraft = async ({
  template,
}: Input): Promise<{ id: number }> => {
  const id = await saveTemplateDraftDb(template);
  return { id };
};
