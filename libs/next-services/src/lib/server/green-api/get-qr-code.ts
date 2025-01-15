'use server';

import { sendRequestToServer } from '../utils/send-request-to-backend';
import { GetQrCodeResponse } from '@monday-whatsapp/shared-types';

type Input = {
  subscriptionId: number;
};

type Output = GetQrCodeResponse;

export const getQrCode = async ({ subscriptionId }: Input): Promise<Output> => {
  const res = await sendRequestToServer<GetQrCodeResponse['data']>({
    path: `green-api/${subscriptionId}/qr`,
    options: {
      next: {
        revalidate: 0,
      },
    },
  });

  const resData = res;
  return resData;
};
