import {
  WhatsappConnectionViewProps,
  WhatsappIntegrationTemplateProps,
  WhatsappTemplate,
} from '@vibe-chat/shared-types';
type Input = {
  connectionViewInfo: WhatsappConnectionViewProps;
  templates: WhatsappTemplate[];
};

type Output = WhatsappIntegrationTemplateProps;

export const useWhatsappIntegrationTemplate = ({
  connectionViewInfo,
  templates,
}: Input): Output => {
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
};
