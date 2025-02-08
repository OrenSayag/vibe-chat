import { updateSubscription as _updateSubscription } from '@monday-whatsapp/db';
import { UpdateSubscriptionInfoRequest } from '@monday-whatsapp/shared-types';

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
