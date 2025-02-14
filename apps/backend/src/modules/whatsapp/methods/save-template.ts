import {
  WhatsappCloudStatus,
  WhatsappTemplate,
  WhatsappTemplateComponent,
} from '@vibe-chat/shared-types';
import { sendRequestToWhatsappGraph } from './send-request-to-whatsapp-graph';
import { getSubscription } from '../../subscription/methods/get-subscription';
import { UnauthorizedException } from '@nestjs/common';

type Input = {
  subscriptionId: string;
  template: {
    name: string;
    language: string;
    category: string;
    components: WhatsappTemplateComponent[];
  };
  templateId?: number;
};

type Output = {
  template: WhatsappTemplate;
};

export const saveTemplate = async ({
  subscriptionId,
  template,
  templateId,
}: Input): Promise<Output> => {
  const {
    info: {
      integrations: { whatsappCloudInfo },
    },
  } = await getSubscription({
    type: 'subscriptionId',
    id: subscriptionId,
  });

  if (whatsappCloudInfo?.status !== WhatsappCloudStatus.SIGNED) {
    throw new UnauthorizedException();
  }

  const res = await sendRequestToWhatsappGraph({
    path: templateId
      ? templateId.toString()
      : `${whatsappCloudInfo.whatsappBusinessAccountId}/message_templates`,
    options: {
      method: 'POST',
      body: JSON.stringify({
        name: template.name,
        language: template.language,
        category: template.category,
        components: template.components,
      }),
    },
  });

  const savedTemplate: WhatsappTemplate = await res.json();
  return { template: savedTemplate };
};
