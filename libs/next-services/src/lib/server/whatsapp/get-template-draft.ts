'use server';

import { GetTemplateDraftResponse } from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';

type Input = {
  name: string;
};

type Output = GetTemplateDraftResponse;

export const getTemplateDraft = async ({ name }: Input): Promise<Output> => {
  const res = await sendRequestToServer<GetTemplateDraftResponse['data']>({
    path: `whatsapp/template-draft/${name}`,
    options: {},
  });
  return res;
};
