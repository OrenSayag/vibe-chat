'use server';

import { sendRequestToServer } from '../utils/send-request-to-backend';
import { LogoutResponse } from '@monday-whatsapp/shared-types';

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
  const resData = res;
  return resData;
};
