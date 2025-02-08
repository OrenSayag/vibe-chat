import { Message } from '@monday-whatsapp/shared-types';
import { db } from '../../config';
import { subscriptionMessages } from '../../schema';

type Input = {
  message: Message;
  subscriptionId: string;
  contactId: number;
};

export const upsertMessageInHistory = async ({
  message,
  subscriptionId,
  contactId,
}: Input) => {
  await db
    .insert(subscriptionMessages)
    .values({
      message,
      subscriptionId,
      contactId,
      id: message.id,
    })
    .onConflictDoUpdate({
      target: subscriptionMessages.id,
      set: {
        message,
        subscriptionId,
        contactId,
      },
    });
};
