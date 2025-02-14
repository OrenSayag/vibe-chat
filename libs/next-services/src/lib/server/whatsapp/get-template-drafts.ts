'use server';

import { GetTemplateDraftsResponse } from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';

type Output = GetTemplateDraftsResponse;

export const getTemplateDrafts = async (): Promise<Output> => {
  const res = await sendRequestToServer<GetTemplateDraftsResponse['data']>({
    path: 'whatsapp/template-drafts',
    options: {},
  });
  return res;
};
