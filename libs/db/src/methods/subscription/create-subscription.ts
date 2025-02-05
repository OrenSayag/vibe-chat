import { db } from '../../config';
import { subscriptions } from '../../schema';
import { sql } from 'drizzle-orm';
import { WhatsappCloudStatus } from '@monday-whatsapp/shared-types';

type Input = {
  accountId: string;
};

export const createSubscription = async ({ accountId }: Input) => {
  const exists = await db
    .select()
    .from(subscriptions)
    .where(sql`${subscriptions.info}->>'accountId' = ${accountId}`);
  if (exists.length > 0) {
    throw new Error('Subscription already exists');
  }
  await db.insert(subscriptions).values({
    info: {
      accountId,
      activatedWorkspaces: [],
      whatsappCloudInfo: {
        status: WhatsappCloudStatus.NOT_SIGNED,
      },
    },
  });
};
