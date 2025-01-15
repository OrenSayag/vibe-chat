'use server';

import { sendRequestToServer } from '../utils/send-request-to-backend';
import { GetNotificationResponse } from '@monday-whatsapp/shared-types';
import { revalidatePath } from 'next/cache';

type Input = {
  subscriptionId: number;
  recentInstanceStatus?: string;
};

type Output = GetNotificationResponse;

export const getNotification = async ({
  subscriptionId,
  recentInstanceStatus,
}: Input): Promise<Output> => {
  console.log('Getting notification...');
  const res = await sendRequestToServer<GetNotificationResponse['data']>({
    path: `green-api/${subscriptionId}/notification`,
    options: {
      next: {
        revalidate: 0,
      },
    },
  });

  if (!res.success) {
    console.error('Failed to get green-api notification');
    // return undefined;
  } else {
    console.log('Got notification.');
    console.log(res);
    if (res.data?.body.typeWebhook === 'stateInstanceChanged') {
      console.log('RECEIVED stateInstanceChanged NOTIFICATION!');
      if (
        res.data?.body.stateInstance === 'authorized' &&
        recentInstanceStatus !== 'authorized'
      ) {
        console.log('REVALIDATE PATH!');
        revalidatePath('/subscription');
      }
    }
  }
  return res;
};
