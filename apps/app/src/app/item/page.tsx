import { getSubscription } from '@monday-whatsapp/next-services/server';
import { getAccountId } from '@monday-whatsapp/monday';
import { ItemTemplateProvider } from '@monday-whatsapp/components';

export default async function ItemPage() {
  const { info, id: subscriptionId } = await getSubscription({
    accountId: (await getAccountId()).toString(),
  });
  return (
    <ItemTemplateProvider
      subscriptionId={subscriptionId}
      subscriptionInfo={info}
    />
  );
}
