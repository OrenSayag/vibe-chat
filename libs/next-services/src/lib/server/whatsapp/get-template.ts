'use server';

import { GetTemplateResponse } from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';

type Input = {
  subscriptionId: string;
  templateName: string;
};

type Output = GetTemplateResponse;

export const getTemplate = async ({
  subscriptionId,
  templateName,
}: Input): Promise<Output> => {
  const res = await sendRequestToServer<GetTemplateResponse['data']>({
    path: `whatsapp/template/${subscriptionId}/${templateName}`,
    options: {},
  });
  return res;
};
