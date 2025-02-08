import { IntegrationNotConnectedViewProvider } from '@vibe-chat/components';
import { getSubscription, redirect } from '@vibe-chat/next-services/server';
import {
  IntegrationType,
  isValidIntegrationType,
} from '@vibe-chat/shared-types';
export default async function IntegrationPage({
  params: { integration, locale, subscriptionId },
}: {
  params: {
    integration: IntegrationType;
    locale: string;
    subscriptionId: string;
  };
}) {
  const { connectedIntegrations } = await getSubscription({
    subscriptionId,
  });
  if (!isValidIntegrationType(integration)) {
    redirect({ href: `/dashboard/${subscriptionId}`, locale });
  }
  if (!connectedIntegrations.includes(integration)) {
    return (
      <IntegrationNotConnectedViewProvider integrationType={integration} />
    );
  }
  return <div>Hello world from integration {integration}</div>;
}
