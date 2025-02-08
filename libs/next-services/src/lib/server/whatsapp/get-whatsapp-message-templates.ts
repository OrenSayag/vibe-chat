import { GetTemplatesResponse } from '@monday-whatsapp/shared-types';
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
  console.log({
    res,
  });
  return res;
};
