'use server';

import {
  BackendBaseResponse,
  CreateSubscriptionInfoResponse,
} from '@monday-whatsapp/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';

type Input = FormData;

type Output = BackendBaseResponse<{ id: string }>;

export const createSubscription = async (formData: Input): Promise<Output> => {
  const res = await sendRequestToServer<CreateSubscriptionInfoResponse['data']>(
    {
      path: 'subscription',
      options: {
        method: 'POST',
        body: formData,
        headers: {},
      },
      isFileUpload: true,
    }
  );
  return res;
};
