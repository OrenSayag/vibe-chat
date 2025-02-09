import {
  IntegrationNotConnectedViewProvider,
  WhatsappIntegrationTemplateProvider,
} from '@vibe-chat/components';
import { getSubscription, redirect } from '@vibe-chat/next-services/server';
import {
  IntegrationType,
  isValidIntegrationType,
  SubscriptionInfo,
  WhatsappCloudStatus,
} from '@vibe-chat/shared-types';
import { ComponentProps, FC } from 'react';

const integrationTemplateMap: {
  [K in IntegrationType]: K extends IntegrationType.WHATSAPP
    ? FC<ComponentProps<typeof WhatsappIntegrationTemplateProvider>>
    : FC<unknown>;
} = {
  [IntegrationType.WHATSAPP]: (
    props: ComponentProps<typeof WhatsappIntegrationTemplateProvider>
  ) => <WhatsappIntegrationTemplateProvider {...props} />,
  [IntegrationType.INSTAGRAM]: () => <div>Instagram</div>,
  [IntegrationType.TELEGRAM]: () => <div>Telegram</div>,
  [IntegrationType.MESSENGER]: () => <div>Messenger</div>,
} as const;

export default async function IntegrationPage({
  params: { integration, locale, subscriptionId },
}: {
  params: {
    integration: IntegrationType;
    locale: string;
    subscriptionId: string;
  };
}) {
  const { connectedIntegrations, info } = await getSubscription({
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
  const Template = integrationTemplateMap[integration];
  return <Template connectionViewInfo={getWhatsappConnectionViewInfo(info)} />;
}

function getWhatsappConnectionViewInfo(info: SubscriptionInfo) {
  if (
    info.integrations.whatsappCloudInfo?.status !== WhatsappCloudStatus.SIGNED
  ) {
    throw new Error('Whatsapp is not signed');
  }

  return {
    whatsappBusinessAccountId:
      info.integrations.whatsappCloudInfo!.whatsappBusinessAccountId!,
    whatsappNumber: info.integrations.whatsappCloudInfo!.whatsappNumber,
    displayName: info.integrations.whatsappCloudInfo!.displayName,
    image: info.integrations.whatsappCloudInfo!.profilePictureUrl,
  };
}
