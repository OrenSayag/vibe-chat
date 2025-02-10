import {
  WhatsappTemplate,
  WhatsappConnectionViewProps,
  WhatsappIntegrationTemplateProps,
} from '@vibe-chat/shared-types';

interface Props {
  connectionViewInfo: WhatsappConnectionViewProps;
  templates: WhatsappTemplate[];
}

export function useWhatsappIntegrationTemplate({
  connectionViewInfo,
  templates,
}: Props): WhatsappIntegrationTemplateProps {
  return {
    connectionViewProps: connectionViewInfo,
    templatesViewProps: {
      listProps: {
        templates,
        onCreateTemplate: () => {},
        onEditTemplate: () => {},
        onDeleteTemplate: () => {},
      },
    },
  };
}
