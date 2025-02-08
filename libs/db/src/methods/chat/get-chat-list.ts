import {
  BaseGetListParams,
  GetChatListParams,
  GetChatListResponse,
} from '@vibe-chat/shared-types';
import { db } from '../../config';
import { subscriptionContacts, subscriptionMessages } from '../../schema';
import { countDistinct, desc, eq } from 'drizzle-orm';

type Input = GetChatListParams & BaseGetListParams;

type Output = GetChatListResponse['data'];

export const getChatList = async ({
  subscriptionId,
  offset,
  limit,
}: Input): Promise<Output> => {
  const query = db
    .selectDistinctOn([subscriptionMessages.contactId])
    .from(subscriptionMessages)
    .orderBy(
      desc(subscriptionMessages.contactId),
      desc(subscriptionMessages.createdAt)
    )
    .offset(offset)
    .limit(limit)
    .innerJoin(
      subscriptionContacts,
      eq(subscriptionMessages.contactId, subscriptionContacts.id)
    )
    .where(eq(subscriptionMessages.subscriptionId, subscriptionId));

  const res = await query.execute();

  const totalCountQuery = await db
    .select({ count: countDistinct(subscriptionMessages.contactId) })
    .from(subscriptionMessages)
    .where(eq(subscriptionMessages.subscriptionId, subscriptionId));

  const totalCount = totalCountQuery[0].count;
  const hasMorePages = offset + res.length < totalCount;
  return {
    list: res.map((row) => ({
      avatarSrc: row.subscription_contacts.info.avatarSrc,
      name: row.subscription_contacts.info.name,
      phoneNumberId: row.subscription_contacts.info.phoneNumberId,
      latestMessage: row.subscription_messages.message,
      contactName: row.subscription_contacts.info.name,
      displayPhoneNumber: row.subscription_contacts.info.displayedPhoneNumber,
    })),
    hasMore: hasMorePages,
  };
};
