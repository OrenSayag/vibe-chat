'use server';

import {
  BackendBaseResponse,
  UpdateWorkspaceInfoRequest,
} from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';
import { revalidatePath } from 'next/cache';

type Input = {
  subscriptionId: string;
  data: UpdateWorkspaceInfoRequest;
  workspaceId: number;
};

type Output = BackendBaseResponse<undefined>;

export const updateWorkspace = async ({
  subscriptionId,
  data,
  workspaceId,
}: Input): Promise<Output> => {
  const res = await sendRequestToServer<undefined>({
    path: `workspace/${workspaceId}?subscriptionId=${subscriptionId}`,
    options: {
      method: 'PATCH',
      body: JSON.stringify(data),
    },
  });
  if (res.success) {
    revalidatePath('/workspace');
  }
  return res;
};
