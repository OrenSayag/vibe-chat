import {
  IntegrationNotConnectedViewProvider,
  WhatsappIntegrationTemplateProvider,
} from '@vibe-chat/components';
import {
  getSubscription,
  redirect,
  getWhatsappMessageTemplates,
} from '@vibe-chat/next-services/server';
import {
  IntegrationType,
  isValidIntegrationType,
  SubscriptionInfo,
  WhatsappCloudStatus,
  intagrationSubSlugs,
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
  params: { integration, locale, subscriptionId, slug },
}: {
  params: {
    integration: IntegrationType;
    locale: string;
    subscriptionId: string;
    slug?: string[];
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

  // Call the new redirect function if applicable
  await redirectToFirstSubslug(integration, subscriptionId, locale, slug);

  const Template = integrationTemplateMap[integration];
  return (
    <Template {...await getWhatsappIntegrationProps(info, subscriptionId)} />
  );
}

// New function to redirect to the first subslug
async function redirectToFirstSubslug(
  integration: IntegrationType,
  subscriptionId: string,
  locale: string,
  slug?: string[]
) {
  if (slug && slug.length > 0) {
    return;
  }

  const subslugs = intagrationSubSlugs[integration];
  if (subslugs && Object.keys(subslugs).length > 0) {
    const firstSubslug = Object.keys(subslugs)[0];
    redirect({
      href: `/dashboard/${subscriptionId}/integration/${integration}/${firstSubslug}`,
      locale,
    });
  }
}

async function getWhatsappIntegrationProps(
  info: SubscriptionInfo,
  subscriptionId: string
): Promise<ComponentProps<typeof WhatsappIntegrationTemplateProvider>> {
  if (
    info.integrations.whatsappCloudInfo?.status !== WhatsappCloudStatus.SIGNED
  ) {
    throw new Error('Whatsapp is not signed');
  }

  const templates = await getWhatsappMessageTemplates({
    subscriptionId,
  });

  let error: string | undefined;
  if (!templates.success) {
    error = 'Error';
  }

  return {
    connectionViewInfo: {
      whatsappBusinessAccountId:
        info.integrations.whatsappCloudInfo!.whatsappBusinessAccountId!,
      whatsappNumber: info.integrations.whatsappCloudInfo!.whatsappNumber,
      displayName: info.integrations.whatsappCloudInfo!.displayName,
      image: info.integrations.whatsappCloudInfo!.profilePictureUrl,
    },
    templates: templates.data,
    error,
  };
}
