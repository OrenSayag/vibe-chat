import {
  WhatsappApiPagination,
  WhatsappCloudStatus,
  WhatsappTemplate,
} from '@vibe-chat/shared-types';
import { sendRequestToWhatsappGraph } from './send-request-to-whatsapp-graph';
import { getSubscription } from '../../subscription/methods/get-subscription';
import { UnauthorizedException } from '@nestjs/common';

type Input = {
  subscriptionId: string;
};

type Output = {
  templates: WhatsappTemplate[];
};

export const getTemplates = async ({
  subscriptionId,
}: Input): Promise<Output> => {
  const {
    info: {
      integrations: { whatsappCloudInfo },
    },
  } = await getSubscription({
    type: 'subscriptionId',
    id: subscriptionId,
  });
  console.log({
    whatsappCloudInfo,
  });
  if (whatsappCloudInfo?.status !== WhatsappCloudStatus.SIGNED) {
    throw new UnauthorizedException();
  }
  const res = await sendRequestToWhatsappGraph({
    path: `${whatsappCloudInfo.whatsappBusinessAccountId}/message_templates`,
  });
  const data: GetTemplateResBody = await res.json();
  return { templates: data.data };
};

type GetTemplateResBody = {
  data: WhatsappTemplate[];
} & WhatsappApiPagination;
