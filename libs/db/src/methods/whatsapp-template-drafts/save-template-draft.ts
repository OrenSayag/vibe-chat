import { sql } from 'drizzle-orm';
import { db } from '../../config';
import { subscriptionTemplateDrafts } from '../../schema';
import { WhatsappTemplate } from '@vibe-chat/shared-types';

type Input = {
  template: WhatsappTemplate;
  subscriptionId: string;
};

export async function saveTemplateDraft({
  template,
  subscriptionId,
}: Input): Promise<number> {
  const existingDraft = await db
    .select()
    .from(subscriptionTemplateDrafts)
    .where(
      sql`${subscriptionTemplateDrafts.template}->>'name' = ${template.name}`
    )
    .limit(1);

  let id: number;

  if (existingDraft.length > 0) {
    // Update existing draft
    id = existingDraft[0].id;
    await db
      .update(subscriptionTemplateDrafts)
      .set({
        template,
        updatedAt: new Date(),
      })
      .where(
        sql`${subscriptionTemplateDrafts.template}->>'name' = ${template.name}`
      );
  } else {
    // Insert new draft
    const result = await db
      .insert(subscriptionTemplateDrafts)
      .values({
        template,
        subscriptionId,
      })
      .returning({ id: subscriptionTemplateDrafts.id });
    id = result[0].id;
  }

  return id;
}
