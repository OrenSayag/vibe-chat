import { WhatsappTemplate } from '@vibe-chat/shared-types';
import { getTemplateDraft as getTemplateDraftDb } from '@vibe-chat/db';

type Input = {
  name: string;
};

type Output = {
  template: WhatsappTemplate | null;
};

export const getTemplateDraft = async ({ name }: Input): Promise<Output> => {
  const template = await getTemplateDraftDb(name);
  return { template };
};
