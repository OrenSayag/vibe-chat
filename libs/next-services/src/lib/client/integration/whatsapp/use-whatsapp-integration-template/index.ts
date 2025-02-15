import { useRouter } from '@vibe-chat/next-services/server';
import {
  WhatsappConnectionViewProps,
  WhatsappIntegrationTemplateProps,
  WhatsappTemplate,
  NEW_WHATSAPP_TEMPLATE_ID,
} from '@vibe-chat/shared-types';
import { useParams } from 'next/navigation';

type Input = {
  connectionViewInfo: WhatsappConnectionViewProps;
  templates: WhatsappTemplate[];
};

type Output = WhatsappIntegrationTemplateProps;

export const useWhatsappIntegrationTemplate = ({
  connectionViewInfo,
  templates,
}: Input): Output => {
  const router = useRouter();
  const { subscriptionId } = useParams();
  return {
    connectionViewProps: connectionViewInfo,
    templatesViewProps: {
      listProps: {
        templates,
        onCreateTemplate: () => {
          router.push(
            `/dashboard/${subscriptionId}/integration/whatsapp/template/${NEW_WHATSAPP_TEMPLATE_ID}`
          );
        },
        onEditTemplate: () => {
          router.push(
            `/dashboard/${subscriptionId}/integration/whatsapp/template/${NEW_WHATSAPP_TEMPLATE_ID}`
          );
        },
        onDeleteTemplate: () => {},
        onDeleteMultipleTemplates: () => {},
      },
    },
  };
};
