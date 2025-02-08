import { db } from '../../config';
import { subscriptions } from '../../schema';
import { sql } from 'drizzle-orm';

type Input = {
  phoneNumberId: string;
};

type Output = {
  subscriptionId: string;
};

export const getSubscriptionIdByPhoneNumberId = async ({
  phoneNumberId,
}: Input): Promise<Output> => {
  const query = db
    .select()
    .from(subscriptions)
    .where(
      sql`${subscriptions.info}->'whatsappCloudInfo'->>'whatsappNumberId' = ${phoneNumberId}`
    );
  const queryRes = await query.execute();
  const [subscription] = queryRes;
  if (!subscription) {
    throw new Error('Subscription not found');
  }
  return { subscriptionId: subscription.id };
};
