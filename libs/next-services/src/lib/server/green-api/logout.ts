'use server';

import { sendRequestToServer } from '../utils/send-request-to-backend';
import { LogoutResponse } from '@monday-whatsapp/shared-types';
import { revalidatePath } from 'next/cache';

type Input = {
  subscriptionId: number;
};

type Output = LogoutResponse;

export const logout = async ({ subscriptionId }: Input): Promise<Output> => {
  const res = await sendRequestToServer<LogoutResponse['data']>({
    path: `green-api/${subscriptionId}/logout`,
    options: {
      next: {
        revalidate: 0,
      },
    },
  });
  if (res.success) {
    revalidatePath('/subscription');
  }
  const resData = res;
  return resData;
};
