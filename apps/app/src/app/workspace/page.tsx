import { getSubscription } from '@monday-whatsapp/next-services/server';
import { getAccountId } from '@monday-whatsapp/monday';
import { WorkspaceTemplateProvider } from '@monday-whatsapp/components';

export default async function WorkspacePage() {
  const { info, id: subscriptionId } = await getSubscription({
    accountId: (await getAccountId()).toString(),
  });

  return (
    <WorkspaceTemplateProvider
      subscriptionId={subscriptionId}
      subscriptionInfo={info}
    />
  );
}
