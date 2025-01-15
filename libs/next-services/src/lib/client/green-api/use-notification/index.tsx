import { useBackendRequest } from '@monday-whatsapp/next-services';
import {
  GetNotificationResponse,
  GreenApiNotification,
} from '@monday-whatsapp/shared-types';
import { getNotification } from '../../../server/green-api/get-notification';
import { useEffect, useState } from 'react';

type Input = {
  subscriptionId: number;
  shouldGet?: boolean;
};

export const useNotification = ({
  subscriptionId,
  shouldGet = true,
}: Input) => {
  useEffect(() => {
    console.log({
      shouldGetNotification: shouldGet,
    });
  }, [shouldGet]);
  const [notification, setNotification] = useState<GreenApiNotification>();
  const { startAction } = useBackendRequest<
    GetNotificationResponse['data'],
    Parameters<typeof getNotification>[0]
  >({
    apiCall: getNotification,
    onSuccess: setNotification,
  });
  return {
    notification,
  };
};
