'use server';

import {
  BackendBaseResponse,
  UpdateSubscriptionInfoRequest,
} from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';
import { revalidatePath } from 'next/cache';

type Input = {
  subscriptionId: string;
  data: UpdateSubscriptionInfoRequest;
};

type Output = BackendBaseResponse<undefined>;

export const updateSubscription = async ({
  subscriptionId,
  data,
}: Input): Promise<Output> => {
  const res = await sendRequestToServer<undefined>({
    path: `subscription/${subscriptionId}`,
    options: {
      method: 'PATCH',
      body: JSON.stringify(data),
    },
  });
  if (res.success) {
    revalidatePath('/subscription');
  }
  return res;
};
