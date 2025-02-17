'use server';

import { BackendBaseResponse } from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';
import { revalidatePath } from 'next/cache';

type DeleteTemplateByIdInput = {
  subscriptionId: string;
  type: 'id';
  templateIds: string[];
};

type Input = DeleteTemplateByIdInput;
type Output = BackendBaseResponse<undefined>;

export const deleteTemplate = async (input: Input): Promise<Output> => {
  const path = `whatsapp/template/${input.subscriptionId}/delete-multiple`;

  const res = await sendRequestToServer<undefined>({
    path,
    options: {
      method: 'POST',
      body: JSON.stringify({ templateIds: input.templateIds }),
    },
  });

  if (res.success) {
    revalidatePath(
      `/dashboard/${input.subscriptionId}/integration/whatsapp/templates`
    );
  }

  return res;
};
