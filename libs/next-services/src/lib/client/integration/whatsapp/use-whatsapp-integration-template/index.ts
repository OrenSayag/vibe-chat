import { WhatsappConnectionViewProps } from 'libs/shared-types/src/dashboard/props.types';
import { WhatsappIntegrationTemplateProps } from 'libs/shared-types/src/lib/whatsapp/whatsapp-component-props.types';

type Input = {
  connectionViewInfo: WhatsappConnectionViewProps;
};

type Output = WhatsappIntegrationTemplateProps;

export const useWhatsappIntegrationTemplate = (input: Input): Output => {
  return {
    connectionViewProps: input.connectionViewInfo,
  };
};
