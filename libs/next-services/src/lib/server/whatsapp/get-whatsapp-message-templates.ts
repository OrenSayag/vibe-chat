import { GetTemplatesResponse } from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';

type Input = {
  subscriptionId: string;
};

type Output = GetTemplatesResponse;

export const getWhatsappMessageTemplates = async ({
  subscriptionId,
}: Input): Promise<Output> => {
  const res = await sendRequestToServer<GetTemplatesResponse['data']>({
    path: `whatsapp/templates/${subscriptionId}`,
    options: {},
  });
  return res;
};
