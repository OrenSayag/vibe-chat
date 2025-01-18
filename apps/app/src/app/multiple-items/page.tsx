import { MultipleItemsTemplateProvider } from '@monday-whatsapp/components';
import { getSubscription } from '@monday-whatsapp/next-services/server';
import { getAccountId } from '@monday-whatsapp/monday';

export default async function MultipleItemsPage() {
  const { info, id: subscriptionId } = await getSubscription({
    accountId: (await getAccountId()).toString(),
  });
  return (
    <MultipleItemsTemplateProvider
      subscriptionId={subscriptionId}
      subscriptionInfo={info}
    />
  );
}
