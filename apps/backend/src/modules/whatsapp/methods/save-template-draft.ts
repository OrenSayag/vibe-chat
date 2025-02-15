import { WhatsappTemplate } from '@vibe-chat/shared-types';
import { saveTemplateDraft as saveTemplateDraftDb } from '@vibe-chat/db';

type Input = {
  template: WhatsappTemplate;
  subscriptionId: string;
};

export const saveTemplateDraft = async ({
  template,
  subscriptionId,
}: Input): Promise<{ id: number }> => {
  const id = await saveTemplateDraftDb({ template, subscriptionId });
  return { id };
};
