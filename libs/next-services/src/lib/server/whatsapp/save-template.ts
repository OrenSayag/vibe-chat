'use server';

import {
  SaveTemplateError,
  SaveTemplateRequest,
  SaveTemplateResponse,
} from '@vibe-chat/shared-types';
import { revalidatePath } from 'next/cache';
import { sendRequestToServer } from '../utils/send-request-to-backend';
import { getTemplate } from './get-template';
type Input = SaveTemplateRequest[];
type Output = SaveTemplateResponse;

export const saveTemplate = async (
  input: Input,
  subscriptionId: string
): Promise<Output> => {
  let success = true;
  let latestRes: SaveTemplateResponse | null = null;
  try {
    await validateTemplateName(input[0].template.name, subscriptionId);
  } catch (err) {
    console.log(err);
    if (
      err instanceof Error &&
      err.message === SaveTemplateError.TEMPLATE_NAME_ALREADY_EXISTS
    ) {
      return {
        success: false,
        message: err.message,
      } as Output;
    }
    return {
      success: false,
      message: (err as Error)?.message,
    } as Output;
  }
  for (const request of input) {
    const res = await sendRequestToServer<SaveTemplateResponse['data']>({
      path: `whatsapp/template/${subscriptionId}`,
      options: {
        method: 'POST',
        body: JSON.stringify(request),
      },
    });
    latestRes = res;
    if (!res.success) {
      success = false;
      break;
    }
  }
  if (success) {
    revalidatePath(
      `/dashboard/${subscriptionId}/integration/whatsapp/templates`
    );
  }
  if (latestRes === null) {
    throw new Error('Failed to save template');
  }
  return latestRes;
};

async function validateTemplateName(name: string, subscriptionId: string) {
  const res = await getTemplate({
    subscriptionId,
    templateName: name,
  });
  console.log({
    res,
  });
  if (res.data?.length > 0) {
    throw new Error(SaveTemplateError.TEMPLATE_NAME_ALREADY_EXISTS);
  }
}
