import { WhatsappTemplateBuilderProvider } from '@vibe-chat/components';
import {
  NEW_WHATSAPP_TEMPLATE_ID,
  WhatsappTemplate,
} from '@vibe-chat/shared-types';
import { getTemplate } from '@vibe-chat/next-services/server';

export default async function WhatsappTemplateBuilderPage({
  params,
}: {
  params: { templateName: string; subscriptionId: string };
}) {
  const { templateName, subscriptionId } = await params;
  let template: WhatsappTemplate | undefined;
  if (templateName !== NEW_WHATSAPP_TEMPLATE_ID) {
    const response = await getTemplate({
      subscriptionId,
      templateName,
    });
    template = response.data;
  }
  return <WhatsappTemplateBuilderProvider template={template} />;
}
