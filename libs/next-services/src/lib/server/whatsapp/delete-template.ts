'use server';

import { BackendBaseResponse } from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';

type DeleteTemplateByIdInput = {
  subscriptionId: string;
  type: 'id';
  templateId: string;
};

type DeleteTemplateByNameInput = {
  subscriptionId: string;
  type: 'name';
  templateName: string;
};

type Input = DeleteTemplateByIdInput | DeleteTemplateByNameInput;
type Output = BackendBaseResponse<undefined>;

export const deleteTemplate = async (input: Input): Promise<Output> => {
  const path =
    input.type === 'id'
      ? `whatsapp/template/${input.subscriptionId}/${input.templateId}`
      : `whatsapp/template/${input.subscriptionId}/name/${input.templateName}`;

  const res = await sendRequestToServer<undefined>({
    path,
    options: {
      method: 'DELETE',
    },
  });
  return res;
};
