import { GetSubscriptionInfoResponse } from '@monday-whatsapp/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';

type Input = {
  accountId: string;
};

type Output = GetSubscriptionInfoResponse['data'];

export const getSubscription = async ({
  accountId,
}: Input): Promise<Output> => {
  const res = await sendRequestToServer<Output>({
    path: `subscription/${accountId}`,
    options: {
      next: {
        revalidate: 65,
      },
    },
  });
  if (!res.success) {
    throw new Error('Failed to get subscription');
  }
  const resData = res.data;
  return resData;
};
