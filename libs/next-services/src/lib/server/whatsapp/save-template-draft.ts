'use server';

import {
  SaveTemplateDraftRequest,
  SaveTemplateDraftResponse,
} from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';

type Input = {
  template: SaveTemplateDraftRequest['template'];
};

type Output = SaveTemplateDraftResponse;

export const saveTemplateDraft = async ({
  template,
}: Input): Promise<Output> => {
  const res = await sendRequestToServer<SaveTemplateDraftResponse['data']>({
    path: 'whatsapp/template-draft',
    options: {
      method: 'POST',
      body: JSON.stringify({ template }),
    },
  });
  return res;
};
