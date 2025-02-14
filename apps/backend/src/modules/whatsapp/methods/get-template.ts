import {
  WhatsappApiPagination,
  WhatsappCloudStatus,
  WhatsappTemplate,
} from '@vibe-chat/shared-types';
import { sendRequestToWhatsappGraph } from './send-request-to-whatsapp-graph';
import { getSubscription } from '../../subscription/methods/get-subscription';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

type Input = {
  subscriptionId: string;
  templateName: string;
};

export const getTemplate = async ({
  subscriptionId,
  templateName,
}: Input): Promise<WhatsappTemplate> => {
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
    path: `${whatsappCloudInfo.whatsappBusinessAccountId}/message_templates?name=${templateName}`,
    options: {
      method: 'GET',
    },
  });

  const data: GetTemplateResBody = await res.json();

  if (!data.data.length) {
    throw new NotFoundException('Template not found');
  }

  return data.data[0];
};

type GetTemplateResBody = {
  data: WhatsappTemplate[];
} & WhatsappApiPagination;
