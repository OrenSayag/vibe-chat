import { and, desc, eq } from 'drizzle-orm';
import { OrganizationUserRole } from '@monday-whatsapp/shared-types';
import { db } from 'libs/db/src/config';
import { subscriptionsUsers } from 'libs/db/src/schema';

type Input = {
  userId: string;
};

type Output = string | null;

export const getUserDefaultSubscription = async ({
  userId,
}: Input): Promise<Output> => {
  const ownerSubscription = await db
    .select({ subscriptionId: subscriptionsUsers.subscriptionId })
    .from(subscriptionsUsers)
    .where(
      and(
        eq(subscriptionsUsers.userId, userId),
        eq(subscriptionsUsers.role, OrganizationUserRole.OWNER)
      )
    )
    .limit(1);

  if (ownerSubscription.length > 0) {
    return ownerSubscription[0].subscriptionId;
  }

  const oldestSubscription = await db
    .select({ subscriptionId: subscriptionsUsers.subscriptionId })
    .from(subscriptionsUsers)
    .where(eq(subscriptionsUsers.userId, userId))
    .orderBy(desc(subscriptionsUsers.createdAt))
    .limit(1);

  return oldestSubscription[0]?.subscriptionId;
};