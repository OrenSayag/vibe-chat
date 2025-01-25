import { db } from '../../config';
import { subscriptions } from '../../schema';
import { eq, sql } from 'drizzle-orm';
import { NotFoundException } from '@nestjs/common';
import { GetSubscriptionInfoResponse } from '@monday-whatsapp/shared-types';

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
        ? sql`JSON_EXTRACT(${subscriptions.info}, '$.accountId') = ${input.accountId}`
        : eq(subscriptions.id, input.id)
    );

  if (res.length === 0) {
    throw new NotFoundException('Subscription not found');
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
