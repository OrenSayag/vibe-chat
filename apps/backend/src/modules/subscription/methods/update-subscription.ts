import { updateSubscription as _updateSubscription } from '@vibe-chat/db';
import { UpdateSubscriptionInfoRequest } from '@vibe-chat/shared-types';

type Input = {
  subscriptionId: string;
  info: UpdateSubscriptionInfoRequest;
};

export const updateSubscription = async ({ info, subscriptionId }: Input) => {
  await _updateSubscription({
    id: subscriptionId,
    info,
  });
};
