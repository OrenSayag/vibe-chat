import { IntegrationNotConnectedViewProvider } from '@vibe-chat/components';
import { getSubscription } from '@vibe-chat/next-services/server';
import { IntegrationType } from '@vibe-chat/shared-types';

export default async function TelegramPage({
    params: { subscriptionId },
}: {
    params: {
        subscriptionId: string;
    };
}) {
    const { connectedIntegrations } = await getSubscription({ subscriptionId });

    if (!connectedIntegrations.includes(IntegrationType.TELEGRAM)) {
        return <IntegrationNotConnectedViewProvider integrationType={IntegrationType.TELEGRAM} />;
    }

    return <div>Telegram Integration Page</div>;
}
