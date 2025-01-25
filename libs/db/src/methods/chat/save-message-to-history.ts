import { Message } from '@monday-whatsapp/shared-types';
import { db } from '../../config';
import { subscriptionMessages } from '../../schema';

type Input = {
  message: Message;
  subscriptionId: number;
  contactId: number;
};

export const saveMessageToHistory = async ({
  message,
  subscriptionId,
  contactId,
}: Input) => {
  await db.insert(subscriptionMessages).values({
    message,
    subscriptionId,
    contactId,
  });
};
