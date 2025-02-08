'use server';

import {
  BackendBaseResponse,
  UpdateBoardRequest,
} from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';
import { revalidatePath } from 'next/cache';

type Input = {
  subscriptionId: string;
  data: UpdateBoardRequest;
  workspaceId: number;
  boardId: number;
};

type Output = BackendBaseResponse<undefined>;

export const updateWorkspaceBoard = async ({
  subscriptionId,
  data,
  workspaceId,
  boardId,
}: Input): Promise<Output> => {
  const res = await sendRequestToServer<undefined>({
    path: `workspace/${workspaceId}/boards/${boardId}/?subscriptionId=${subscriptionId}`,
    options: {
      method: 'PATCH',
      body: JSON.stringify(data),
    },
  });
  if (res.success) {
    revalidatePath('/board');
  }
  return res;
};
