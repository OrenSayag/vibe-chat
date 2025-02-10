import { IntegrationNotConnectedViewProvider } from '@vibe-chat/components';
import { getSubscription } from '@vibe-chat/next-services/server';
import { IntegrationType } from '@vibe-chat/shared-types';

export default async function InstagramPage({
    params: { subscriptionId },
}: {
    params: {
        subscriptionId: string;
    };
}) {
    const { connectedIntegrations } = await getSubscription({ subscriptionId });

    if (!connectedIntegrations.includes(IntegrationType.INSTAGRAM)) {
        return <IntegrationNotConnectedViewProvider integrationType={IntegrationType.INSTAGRAM} />;
    }

    return <div>Instagram Integration Page</div>;
}
