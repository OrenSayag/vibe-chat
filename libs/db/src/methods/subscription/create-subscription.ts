import {
  OrganizationInfoSchema,
  OrganizationUserRole,
} from '@monday-whatsapp/shared-types';
import { db, subscriptions, subscriptionsUsers } from '@monday-whatsapp/db';

type Input = {
  organizationInfo: OrganizationInfoSchema;
  userId: string;
};

type Output = {
  id: string;
};

export const createSubscription = async ({
  organizationInfo,
  userId,
}: Input): Promise<Output> => {
  return await db.transaction(async (tx) => {
    const queryRes = await tx
      .insert(subscriptions)
      .values({
        info: {
          organizationInfo,
          integrations: {},
        },
      })
      .returning({ insertedId: subscriptions.id });

    const { insertedId } = queryRes[0];

    await tx.insert(subscriptionsUsers).values({
      userId,
      subscriptionId: insertedId,
      role: OrganizationUserRole.OWNER,
    });

    return {
      id: insertedId,
    };
  });
};
