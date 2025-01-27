import {
  BaseGetListParams,
  GetChatSessionParams,
  GetChatSessionResponse,
} from '@monday-whatsapp/shared-types';
import { db } from '../../config';
import { subscriptionMessages } from '../../schema';
import { count, desc, eq } from 'drizzle-orm';
import { getContact } from '../contacts/get-contact';

type Input = BaseGetListParams & GetChatSessionParams;

type Output = GetChatSessionResponse['data'];

export const getChatSession = async ({
  subscriptionId,
  phoneNumberId,
  offset,
  limit,
}: Input): Promise<Output> => {
  const contact = await getContact({
    subscriptionId,
    phoneNumberId,
  });
  if (!contact) {
    throw new Error('Contact not found');
  }
  const getsMessagesRes = await db
    .select()
    .from(subscriptionMessages)
    .where(eq(subscriptionMessages.subscriptionId, subscriptionId))
    .offset(offset)
    .limit(limit)
    .orderBy(desc(subscriptionMessages.createdAt));

  const totalCountQuery = await db
    .select({ count: count() })
    .from(subscriptionMessages)
    .where(eq(subscriptionMessages.subscriptionId, subscriptionId));

  const totalCount = totalCountQuery[0].count;
  const hasMorePages = offset + getsMessagesRes.length < totalCount;

  return {
    hasMore: hasMorePages,
    history: {
      contact: {
        phoneNumberId: contact.phoneNumberId,
        name: contact.name,
        contactName: contact.name,
        displayPhoneNumber: contact.displayedPhoneNumber,
        avatarSrc: contact.avatarSrc,
      },
      history: getsMessagesRes.map((m) => ({
        ...m.message,
      })),
    },
  };
};
