import { WhatsappTemplate } from '@vibe-chat/shared-types';
import { getTemplateDrafts as getTemplateDraftsDb } from '@vibe-chat/db';

type Output = {
  templates: WhatsappTemplate[];
};

export const getTemplateDrafts = async (): Promise<Output> => {
  const templates = await getTemplateDraftsDb();
  return { templates };
};
