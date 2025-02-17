import { WhatsappTemplateBuilderProvider } from '@vibe-chat/components';
import { getTemplate, redirect } from '@vibe-chat/next-services/server';
import {
  Locale,
  NEW_WHATSAPP_TEMPLATE_ID,
  WhatsappTemplate,
} from '@vibe-chat/shared-types';

export default async function WhatsappTemplateBuilderPage({
  params,
  searchParams,
}: {
  params: { templateName: string; subscriptionId: string; locale: string };
  searchParams: {
    templateLocale?: Locale;
  };
}) {
  const { templateName, subscriptionId, locale } = await params;
  const { templateLocale } = await searchParams;
  const { data: templateByLocale } = await getTemplate({
    subscriptionId,
    templateName,
  });
  if (!templateLocale && templateByLocale.length > 0) {
    redirect({
      href: `/dashboard/${subscriptionId}/integration/whatsapp/template/${templateName}?templateLocale=${
        templateByLocale[0].language.split('_')?.[0]
      }`,
      locale,
    });
  }
  const template = templateByLocale?.find(
    (template) => template.language.split('_')?.[0] === templateLocale
  );
  if (
    (templateByLocale?.length === 0 || !templateByLocale) &&
    templateName !== NEW_WHATSAPP_TEMPLATE_ID
  ) {
    redirect({
      href: `/dashboard/${subscriptionId}/integration/whatsapp/templates`,
      locale,
    });
  }

  return (
    <WhatsappTemplateBuilderProvider
      template={{
        ...(template as WhatsappTemplate),
        language: template?.language ?? templateLocale!,
        name: templateByLocale[0].name,
        category: templateByLocale[0].category,
        components: template?.components ?? [],
      }}
    />
  );
}
