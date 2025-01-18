import { BoardGroupTemplateProvider } from '@monday-whatsapp/components';
import { getSubscription } from '@monday-whatsapp/next-services/server';
import { getAccountId } from '@monday-whatsapp/monday';

export default async function BoardGroup() {
  const { info, id: subscriptionId } = await getSubscription({
    accountId: (await getAccountId()).toString(),
  });
  return (
    <BoardGroupTemplateProvider
      subscriptionId={subscriptionId}
      subscriptionInfo={info}
    />
  );
}
