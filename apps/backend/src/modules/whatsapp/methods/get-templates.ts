import {
  WhatsappApiPagination,
  WhatsappCloudStatus,
  WhatsappTemplate,
} from '@monday-whatsapp/shared-types';
import { sendRequestToWhatsappGraph } from './send-request-to-whatsapp-graph';
import { getSubscription } from '../../subscription/methods/get-subscription';
import { UnauthorizedException } from '@nestjs/common';

type Input = {
  subscriptionId: number;
};

type Output = {
  templates: WhatsappTemplate[];
};

export const getTemplates = async ({
  subscriptionId,
}: Input): Promise<Output> => {
  const {
    info: { whatsappCloudInfo },
  } = await getSubscription({
    type: 'subscriptionId',
    id: subscriptionId,
  });
  if (whatsappCloudInfo.status !== WhatsappCloudStatus.SIGNED) {
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
