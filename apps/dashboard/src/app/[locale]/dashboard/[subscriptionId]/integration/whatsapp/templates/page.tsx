import { WhatsappIntegrationTemplateProvider } from '@vibe-chat/components';
import { getWhatsappIntegrationProps } from '@vibe-chat/next-services/server';
import { getSubscription } from '@vibe-chat/next-services/server';
import { WhatsappCloudStatus } from '@vibe-chat/shared-types';

export default async function TemplatesPage({
  params: { subscriptionId },
}: {
  params: { subscriptionId: string };
}) {
  const { info } = await getSubscription({ subscriptionId });

  if (
    info.integrations.whatsappCloudInfo?.status !== WhatsappCloudStatus.SIGNED
  ) {
    throw new Error('Whatsapp is not signed');
  }

  const props = await getWhatsappIntegrationProps(info, subscriptionId);
  return <WhatsappIntegrationTemplateProvider {...props} type="templates" />;
}
