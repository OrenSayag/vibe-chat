import { sql } from 'drizzle-orm';
import { db } from '../../config';
import { subscriptionTemplateDrafts } from '../../schema';
import { WhatsappTemplate } from '@vibe-chat/shared-types';

export async function getTemplateDraft(
  name: string
): Promise<WhatsappTemplate | null> {
  const drafts = await db
    .select()
    .from(subscriptionTemplateDrafts)
    .where(sql`${subscriptionTemplateDrafts.template}->>'name' = ${name}`)
    .limit(1);

  if (drafts.length === 0) {
    return null;
  }

  return {
    ...drafts[0].template,
    isDraft: true,
  };
}
