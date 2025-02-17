import { WhatsappTemplateBuilderProvider } from '@vibe-chat/components';
import { getTemplate, redirect } from '@vibe-chat/next-services/server';
import { NEW_WHATSAPP_TEMPLATE_ID } from '@vibe-chat/shared-types';

export default async function WhatsappTemplateBuilderPage({
  params,
}: {
  params: { templateName: string; subscriptionId: string; locale: string };
}) {
  const { templateName, subscriptionId, locale } = await params;
  const { data: templateByLocale } = await getTemplate({
    subscriptionId,
    templateName,
  });
  if (
    templateByLocale?.length === 0 &&
    templateName !== NEW_WHATSAPP_TEMPLATE_ID
  ) {
    redirect({
      href: `/dashboard/${subscriptionId}/integration/whatsapp/templates`,
      locale,
    });
  }

  return (
    <WhatsappTemplateBuilderProvider templateByLocale={templateByLocale} />
  );
}
