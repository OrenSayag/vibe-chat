import {
  OrganizationInfoSchema,
  OrganizationUserRole,
} from '@monday-whatsapp/shared-types';
import {
  db,
  subscriptions,
  subscriptionsUsers,
  media,
} from '@monday-whatsapp/db';
import { eq, sql } from 'drizzle-orm';
import { getMediaDownloadUrl } from '@monday-whatsapp/utils';

type Input = {
  userId: string;
};

type Output = {
  organizations: (Omit<OrganizationInfoSchema, 'image'> & {
    subscriptionId: string;
    organizationUserRole: OrganizationUserRole;
    image: string;
  })[];
};

export const getUserOrganizations = async ({
  userId,
}: Input): Promise<Output> => {
  const queryRes = await db
    .select()
    .from(subscriptionsUsers)
    .innerJoin(
      subscriptions,
      eq(subscriptions.id, subscriptionsUsers.subscriptionId)
    )
    .leftJoin(
      media,
      eq(
        media.id,
        sql`(${subscriptions.info}->'organizationInfo'->>'image')::integer`
      )
    )
    .where(eq(subscriptionsUsers.userId, userId));

  return {
    organizations: queryRes.map((row) => ({
      subscriptionId: row.subscriptions.id,
      displayName: row.subscriptions.info.organizationInfo.displayName,
      image: row.media
        ? getMediaDownloadUrl({
            bucket: row.media.bucket,
            key: row.media.key,
          })
        : '',
      organizationUserRole: row.subscriptions_users
        .role as OrganizationUserRole,
    })),
  };
};
