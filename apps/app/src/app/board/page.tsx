import { getSubscription } from '@monday-whatsapp/next-services/server';
import { getAccountId } from '@monday-whatsapp/monday';
import { BoardTemplateProvider } from '@monday-whatsapp/components';

export default async function BoardPage() {
  const { info, id: subscriptionId } = await getSubscription({
    accountId: (await getAccountId()).toString(),
  });
  return (
    <BoardTemplateProvider
      subscriptionId={subscriptionId}
      subscriptionInfo={info}
    />
  );
}
