'use server';

import {
  SaveTemplateRequest,
  SaveTemplateResponse,
} from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';

type Input = SaveTemplateRequest;
type Output = SaveTemplateResponse;

export const saveTemplate = async (input: Input): Promise<Output> => {
  const res = await sendRequestToServer<SaveTemplateResponse['data']>({
    path: 'whatsapp/template',
    options: {
      method: 'POST',
      body: JSON.stringify(input),
    },
  });
  return res;
};
