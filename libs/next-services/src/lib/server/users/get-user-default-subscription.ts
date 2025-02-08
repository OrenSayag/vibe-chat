import { GetUserDefaultSubscriptionResponse } from '@vibe-chat/shared-types';
import { sendRequestToServer } from '../utils/send-request-to-backend';

type Input = string;
type Output = string | undefined;

export async function getUserDefaultSubscription(
  userId: Input
): Promise<Output> {
  const res = await sendRequestToServer<
    GetUserDefaultSubscriptionResponse['data']
  >({
    path: `user/${userId}/default-subscription`,
    options: {
      next: {
        revalidate: 0,
      },
    },
  });

  if (!res.success) {
    return undefined;
  }

  return res.data.defaultSubscriptionId;
}
