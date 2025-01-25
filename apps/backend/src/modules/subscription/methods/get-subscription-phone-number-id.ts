import { getSubscription } from './get-subscription';
import { WhatsappCloudStatus } from '@monday-whatsapp/shared-types';

type Input = {
  subscriptionId: number;
};

type Output = {
  phoneNumberId: string;
};

export const getSubscriptionPhoneNumberId = async ({
  subscriptionId,
}: Input): Promise<Output> => {
  const {
    info: { whatsappCloudInfo },
  } = await getSubscription({
    type: 'subscriptionId',
    id: subscriptionId,
  });
  if (whatsappCloudInfo.status !== WhatsappCloudStatus.SIGNED) {
    throw new Error('This subscription account is not configured');
  }
  return { phoneNumberId: whatsappCloudInfo.whatsappNumberId };
};
