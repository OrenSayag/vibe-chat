import { WhatsappCloudStatus, WhatsappTemplate } from '@vibe-chat/shared-types';
import { sendRequestToWhatsappGraph } from './send-request-to-whatsapp-graph';
import { getSubscription } from '../../subscription/methods/get-subscription';
import { UnauthorizedException } from '@nestjs/common';
import { WHATSAPP_BUSINESS_ACCOUNT_ID } from '@vibe-chat/config';

type Input = (
  | {
      templateId: string;
      type: 'id';
    }
  | {
      type: 'name';
      templateName: string;
    }
) & {
  subscriptionId: string;
};

type Output = {
  template: WhatsappTemplate;
};

export const getTemplate = async (input: Input): Promise<Output> => {
  const { subscriptionId, type } = input;
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
    path: `${WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates?${
      type === 'id'
        ? `hsm_id=${input.templateId}`
        : `name=${input.templateName}`
    }`,
  });

  const template: WhatsappTemplate = await res.json();
  return { template };
};
