'use server';

import {
    getUserDefaultSubscription,
    redirect,
} from '@monday-whatsapp/next-services/server';
import { auth } from '../../../auth';

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = await auth();

  if (!session) {
    redirect({
      href: '/auth/login',
      locale,
    });
  }

  const defaultSubscriptionId = await getUserDefaultSubscription(
    session!.user!.id!
  );

  if (!defaultSubscriptionId) {
    redirect({
      href: '/create-organization',
      locale,
    });
  }

  redirect({
    href: `/dashboard/${defaultSubscriptionId}`,
    locale,
  });
}
