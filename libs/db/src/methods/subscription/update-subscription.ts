import { UpdateSubscriptionInfoRequest } from '@monday-whatsapp/shared-types';
import { db } from '../../config';
import { subscriptions } from '../../schema';
import { eq } from 'drizzle-orm';
import { getSubscription } from './get-subscription';

type Input = {
  info: UpdateSubscriptionInfoRequest;
  id: number;
};

export const updateSubscription = async ({ info, id }: Input) => {
  const existingSubscriptionInfo = await getSubscription({
    type: 'subscriptionId',
    id,
  });
  await db
    .update(subscriptions)
    .set({
      info: {
        ...existingSubscriptionInfo.subscriptionInfo,
        activatedWorkspaces: info.activatedWorkspaces.map((itemId) => {
          const exists =
            existingSubscriptionInfo.subscriptionInfo.activatedWorkspaces.find(
              (ws) => ws.id === itemId
            );
          if (exists) {
            return exists;
          }
          return {
            id: itemId,
            activationTime: new Date().toISOString(),
          };
        }),
      },
    })
    .where(eq(subscriptions.id, id));
};
