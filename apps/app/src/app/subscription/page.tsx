import { SubscriptionTemplateProvider } from '@monday-whatsapp/components';
import {
  getSubscription,
  getWorkspaces,
} from '@monday-whatsapp/next-services/server';

export default async function SubscriptionPage() {
  const { workspaces, accountId } = await getWorkspaces();
  const { activatedWorkspaces, id } = await getSubscription({
    accountId,
  });
  console.log({
    activatedWorkspaces,
    id,
  });
  return (
    <SubscriptionTemplateProvider
      subscriptionId={id.toString()}
      activatedWorkspaces={workspaces
        .filter((w) => activatedWorkspaces.some((aw) => aw.id === w.id))
        .map((w) => ({
          label: w.name,
          value: {
            activationDate: activatedWorkspaces.find((aw) => aw.id === w.id)!
              .activationTime,
            id: w.id,
          },
        }))}
      deactivatedWorkspaces={workspaces
        .filter((w) => !activatedWorkspaces.some((aw) => aw.id === w.id))
        .map((w) => ({
          label: w.name,
          value: {
            id: w.id,
          },
        }))}
    />
  );
}
