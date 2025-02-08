import { ContactInfo } from '@vibe-chat/shared-types';
import { db } from '../../config';
import { subscriptionContacts } from '../../schema';
import { and, eq, sql } from 'drizzle-orm';

type Input = {
  phoneNumberId: string;
  subscriptionId: string;
};

type Output = (ContactInfo & { id: number }) | undefined;

export const getContact = async ({
  phoneNumberId,
  subscriptionId,
}: Input): Promise<Output> => {
  const res = await db
    .select()
    .from(subscriptionContacts)
    .where(
      and(
        eq(subscriptionContacts.subscriptionId, subscriptionId),
        sql`${subscriptionContacts.info}->>'phoneNumberId' = ${phoneNumberId}`
      )
    );
  if (res.length === 0) {
    return undefined;
  }
  return { ...res[0].info, id: res[0].id };
};
