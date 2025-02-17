import { WhatsappCloudStatus } from '@vibe-chat/shared-types';
import { sendRequestToWhatsappGraph } from './send-request-to-whatsapp-graph';
import { getSubscription } from '../../subscription/methods/get-subscription';
import { UnauthorizedException } from '@nestjs/common';

type Input = {
  templateName: string;
  subscriptionId: string;
};
export const deleteTemplate = async (input: Input): Promise<void> => {
  const { subscriptionId, templateName } = input;
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

  const url = `${whatsappCloudInfo.whatsappBusinessAccountId}/message_templates?name=${templateName}`;

  await sendRequestToWhatsappGraph({
    path: url,
    options: {
      method: 'DELETE',
    },
  });
};
