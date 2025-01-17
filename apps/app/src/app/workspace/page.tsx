import { WorkspaceTemplate } from '@monday-whatsapp/components';
import { getSubscription } from '@monday-whatsapp/next-services/server';
import { getAccountId } from '@monday-whatsapp/monday';

export default async function WorkspacePage() {
  const {
    info: { activatedWorkspaces },
    id: subscriptionId,
  } = await getSubscription({
    accountId: (await getAccountId()).toString(),
  });
  return (
    <WorkspaceTemplate
      activatedWorkspaceIds={activatedWorkspaces.map((w) => w.id)}
      subscriptionId={subscriptionId}
    />
  );
}
