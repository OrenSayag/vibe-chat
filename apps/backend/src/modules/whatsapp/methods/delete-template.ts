import { WhatsappCloudStatus } from '@vibe-chat/shared-types';
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

export const deleteTemplate = async (input: Input): Promise<void> => {
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

  await sendRequestToWhatsappGraph({
    path: `${WHATSAPP_BUSINESS_ACCOUNT_ID}/message_templates?${
      type === 'id'
        ? `hsm_id=${input.templateId}`
        : `name=${input.templateName}`
    }=${type === 'id' ? input.templateId : input.templateName}`,
    options: {
      method: 'DELETE',
    },
  });
};
