import { IntegrationNotConnectedViewProvider } from '@vibe-chat/components';
import { getSubscription } from '@vibe-chat/next-services/server';
import { IntegrationType } from '@vibe-chat/shared-types';

export default async function MessengerPage({
    params: { subscriptionId },
}: {
    params: {
        subscriptionId: string;
    };
}) {
    const { connectedIntegrations } = await getSubscription({ subscriptionId });

    if (!connectedIntegrations.includes(IntegrationType.MESSENGER)) {
        return <IntegrationNotConnectedViewProvider integrationType={IntegrationType.MESSENGER} />;
    }

    return <div>Messenger Integration Page</div>;
}
