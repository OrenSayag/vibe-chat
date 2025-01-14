import { SubscriptionTemplate } from '@monday-whatsapp/components';
import { getWorkspaces } from '@monday-whatsapp/next-services/server';

export default async function SubscriptionPage() {
  const workspaces = await getWorkspaces();
  return (
    <SubscriptionTemplate
      activatedWorkspaces={workspaces
        .filter((w) => w.chatActivationDate)
        .map((w) => ({
          label: w.name,
          value: {
            activationDate: w.chatActivationDate!,
            id: w.id,
          },
        }))}
      deactivatedWorkspaces={workspaces
        .filter((w) => !w.chatActivationDate)
        .map((w) => ({
          label: w.name,
          value: {
            id: w.id,
          },
        }))}
    />
  );
}
