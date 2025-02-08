import { MessageStatus } from '@vibe-chat/shared-types';
import { db } from '../../config';
import { subscriptionMessages } from '../../schema';
import { eq } from 'drizzle-orm';

type Input = {
  mid: string;
  status: MessageStatus;
};

export const updateMessageStatus = async ({ mid, status }: Input) => {
  const queryRes = await db
    .select()
    .from(subscriptionMessages)
    .where(eq(subscriptionMessages.id, mid));
  const [message] = queryRes;
  if (!message) {
    throw new Error('Message not found');
  }
  await db
    .update(subscriptionMessages)
    .set({
      message: {
        ...message.message,
        status,
      },
    })
    .where(eq(subscriptionMessages.id, message.id));
  return {
    ...message.message,
    status,
  };
};
