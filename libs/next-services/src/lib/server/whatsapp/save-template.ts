'use server';

import {
  SaveTemplateRequest,
  SaveTemplateResponse,
} from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';
import { revalidatePath } from 'next/cache';

type Input = SaveTemplateRequest;
type Output = SaveTemplateResponse;

export const saveTemplate = async (
  input: Input,
  subscriptionId: string
): Promise<Output> => {
  const res = await sendRequestToServer<SaveTemplateResponse['data']>({
    path: `whatsapp/template/${subscriptionId}`,
    options: {
      method: 'POST',
      body: JSON.stringify(input),
    },
  });
  if (res.success) {
    revalidatePath(
      `/dashboard/${subscriptionId}/integration/whatsapp/templates`
    );
  }
  return res;
};
