'use server';

import {
  SaveTemplateRequest,
  SaveTemplateResponse,
} from '@vibe-chat/shared-types';
import { revalidatePath } from 'next/cache';
import { sendRequestToServer } from '../utils/send-request-to-backend';
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
