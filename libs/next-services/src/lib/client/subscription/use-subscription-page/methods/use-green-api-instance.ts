import { ComponentPropsWithoutRef } from 'react';
import { SubscriptionTemplate } from '@monday-whatsapp/components';
import {
  GetSubscriptionInfoResponse,
  GreenApiInstanceStatus,
} from '@monday-whatsapp/shared-types';
import { useGreenApiGetQr } from './use-green-api-get-qr';
import { useGreenApiLogout } from './use-green-api-logout';

type Input = Omit<GetSubscriptionInfoResponse['data'], 'info'>;

type Output = ComponentPropsWithoutRef<
  typeof SubscriptionTemplate
>['greenApiInstanceProps'];

export const useGreenApiInstance = ({
  greenApiInstanceInfo,
  id: subscriptionId,
}: Input): Output => {
  const { qr } = useGreenApiGetQr({
    subscriptionId,
    instanceState: greenApiInstanceInfo?.status,
  });
  const { pendingLogout, onLogout } = useGreenApiLogout({
    subscriptionId,
  });
  return {
    status:
      greenApiInstanceInfo?.status ??
      GreenApiInstanceStatus.MISSING_GREEN_API_INSTANCE_INFO,
    phoneNumber: greenApiInstanceInfo?.wid,
    onDisconnectWhatsapp: onLogout,
    pendingDisconnect: pendingLogout,
    qrCode: qr,
  };
};
