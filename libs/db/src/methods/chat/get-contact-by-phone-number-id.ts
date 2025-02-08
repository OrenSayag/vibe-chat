import { db } from '../../config';
import { subscriptionContacts } from '../../schema';
import { and, eq, sql } from 'drizzle-orm';

type Input = {
  phoneNumberId: string;
  displayedPhoneNumber: string;
  subscriptionId: string;
  name?: string;
};

type Output = {
  id: number;
};

export const getContactByPhoneNumberId = async ({
  phoneNumberId,
  subscriptionId,
  displayedPhoneNumber,
  name,
}: Input): Promise<Output> => {
  const res = await db
    .select()
    .from(subscriptionContacts)
    .where(
      and(
        eq(subscriptionContacts.subscriptionId, subscriptionId),
        sql`
${subscriptionContacts.info}->>'phoneNumberId' = ${phoneNumberId}
`
      )
    );
  const [contact] = res;
  let id: number;
  if (!contact) {
    const res = await db.insert(subscriptionContacts).values({
      subscriptionId,
      info: {
        phoneNumberId,
        displayedPhoneNumber,
        name: name ?? displayedPhoneNumber,
      },
    });
    id = res.oid;
  } else {
    id = contact.id;
  }
  return {
    id,
  };
};
