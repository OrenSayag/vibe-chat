import { db } from '../../config';
import { eq, sql } from 'drizzle-orm';
import { GetSubscriptionInfoResponse } from '@vibe-chat/shared-types';
import { subscriptions } from '../../schema';

type Input =
  | {
      type: 'mondayAccountId';
      accountId: string;
    }
  | {
      type: 'subscriptionId';
      id: string;
    };

type Output = GetSubscriptionInfoResponse['data'];

export const getSubscription = async (input: Input): Promise<Output> => {
  const { type } = input;
  const [subscription] = await db
    .select()
    .from(subscriptions)
    .where(
      type === 'mondayAccountId'
        ? sql`${subscriptions.info}->>'accountId' = ${input.accountId}`
        : eq(subscriptions.id, input.id)
    );

  if (!subscription) {
    throw new Error(
      `Subscription not found for ${
        type === 'mondayAccountId'
          ? 'accountId: ' + input.accountId
          : 'id: ' + input.id
      }`
    );
  }

  const { info, id } = subscription;
  return {
    id,
    info,
  };
};
