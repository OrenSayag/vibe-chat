'use server';

import {
  SaveTemplateDraftRequest,
  SaveTemplateDraftResponse,
} from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';
import fs from 'fs';
type Input = {
  template: SaveTemplateDraftRequest['template'];
  subscriptionId: string;
};

type Output = SaveTemplateDraftResponse;

export const saveTemplateDraft = async ({
  template,
  subscriptionId,
}: Input): Promise<Output> => {
  const res = await sendRequestToServer<SaveTemplateDraftResponse['data']>({
    path: `whatsapp/template-draft/${subscriptionId}`,
    options: {
      method: 'POST',
      body: JSON.stringify({ template }),
    },
  });
  if (process.env['LOG_FILE']) {
    fs.writeFileSync(
      process.env['LOG_FILE'],
      JSON.stringify({ ...res, req: template }, null, 2)
    );
  }
  return res;
};
