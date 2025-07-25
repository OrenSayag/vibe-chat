import { useEffect, useState, useTransition } from 'react';
import { monday } from '@vibe-chat/monday';
import {
  GetSubscriptionInfoResponse,
  WhatsappCloudStatus,
} from '@vibe-chat/shared-types';
import { getSubscription } from '@vibe-chat/next-services/server';

export const useGetSubscription = () => {
  const [data, setDaa] = useState<GetSubscriptionInfoResponse['data']>();
  const [pendingGetSubscription, startGetSubscription] = useTransition();
  const get = async () => {
    const {
      data: {
        account: { id: accountId },
      },
    } = await monday.get('context');
    const data = await getSubscription({
      accountId,
    });
    setDaa(data);
  };
  const onGetSubscription = () => {
    startGetSubscription(get);
  };
  useEffect(() => {
    onGetSubscription();
  }, []);
  return {
    getSubscription: onGetSubscription,
    pendingGetSubscription,
    subscriptionData: data,
    accountNotConfigured: data?.info.integrations.whatsappCloudInfo
      ? data?.info.integrations.whatsappCloudInfo.status ===
        WhatsappCloudStatus.NOT_SIGNED
      : true,
  };
};
