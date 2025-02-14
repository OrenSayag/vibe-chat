import { db } from '../../config';
import { subscriptionTemplateDrafts } from '../../schema';
import { WhatsappTemplate } from '@vibe-chat/shared-types';

export async function getTemplateDrafts(): Promise<WhatsappTemplate[]> {
  const drafts = await db
    .select()
    .from(subscriptionTemplateDrafts)
    .orderBy(subscriptionTemplateDrafts.createdAt);

  return drafts.map((draft) => ({
    ...draft.template,
    isDraft: true,
  }));
}
