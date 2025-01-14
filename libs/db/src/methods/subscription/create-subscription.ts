import { db } from '../../config';
import { subscriptions } from '../../schema';
import { sql } from 'drizzle-orm';
import { BadRequestException } from '@nestjs/common';

type Input = {
  accountId: string;
};

export const createSubscription = async ({ accountId }: Input) => {
  const exists = await db
    .select()
    .from(subscriptions)
    .where(
      sql`JSON_EXTRACT(${subscriptions.info}, '$.accountId') = ${accountId}`
    );

  if (exists.length > 0) {
    throw new BadRequestException('Subscription already exists');
  }
  await db.insert(subscriptions).values({
    info: {
      accountId,
      activatedWorkspaces: [],
    },
  });
};
