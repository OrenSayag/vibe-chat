import { ContactInfo } from '@monday-whatsapp/shared-types';
import { db } from '../../config';
import { subscriptionContacts, subscriptionMessages } from '../../schema';
import { eq } from 'drizzle-orm';

type Input = {
  mid: string;
};

type Output = ContactInfo;

export const getMessageContact = async ({ mid }: Input): Promise<Output> => {
  const queryRes = await db
    .select()
    .from(subscriptionMessages)
    .innerJoin(
      subscriptionContacts,
      eq(subscriptionMessages.contactId, subscriptionContacts.id)
    )
    .where(eq(subscriptionMessages.id, mid));
  const [contact] = queryRes;
  if (!contact) {
    throw new Error(`Contact not found for message id ${mid}`);
  }
  return contact.subscription_contacts.info;
};
