import { db } from '../../config';
import { subscriptionMessages } from '../../schema';
import { eq } from 'drizzle-orm';

type Input = {
  mid: string;
};

type Output = {
  subscriptionId: string;
};

export const getSubscriptionIdByMessageId = async ({
  mid,
}: Input): Promise<Output> => {
  const queryRes = await db
    .select()
    .from(subscriptionMessages)
    .where(eq(subscriptionMessages.id, mid));
  const [message] = queryRes;
  if (!message) {
    throw new Error('Message not found');
  }
  return { subscriptionId: message.subscriptionId };
};
