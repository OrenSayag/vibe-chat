import { db } from '../../config';
import { eq, sql } from 'drizzle-orm';
import { GetSubscriptionInfoResponse } from '@monday-whatsapp/shared-types';
import { subscriptions } from '../../schema';

type Input =
  | {
      type: 'accountId';
      accountId: string;
    }
  | {
      type: 'subscriptionId';
      id: number;
    };

type Output = GetSubscriptionInfoResponse['data'];

export const getSubscription = async (input: Input): Promise<Output> => {
  const { type } = input;
  const res = await db
    .select()
    .from(subscriptions)
    .where(
      type === 'accountId'
        ? sql`${subscriptions.info}->>'accountId' = ${input.accountId}`
        : eq(subscriptions.id, input.id)
    );

  if (res.length === 0) {
    throw new Error('Subscription not found');
  }

  return {
    info: {
      accountId: res[0].info.accountId,
      activatedWorkspaces: res[0].info.activatedWorkspaces,
      whatsappCloudInfo: res[0].info.whatsappCloudInfo,
    },
    id: res[0].id,
  };
};
