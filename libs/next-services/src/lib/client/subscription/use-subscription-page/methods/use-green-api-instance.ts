import {
  GetSubscriptionInfoResponse,
  GreenApiInstanceStatus,
} from '@monday-whatsapp/shared-types';
import { useGreenApiGetQr } from './use-green-api-get-qr';
import { useGreenApiLogout } from './use-green-api-logout';
import { useGreenApiInstanceStatusChange } from './use-green-api-instance-status-change';

type Input = Partial<Omit<GetSubscriptionInfoResponse['data'], 'info'>>;

export const useGreenApiInstance = ({
  greenApiInstanceInfo,
  id: subscriptionId,
}: Input) => {
  const { qr, pending: pendingQr } = useGreenApiGetQr({
    subscriptionId,
    instanceState: greenApiInstanceInfo?.status,
  });
  const { pendingLogout, onLogout } = useGreenApiLogout({
    subscriptionId,
  });
  useGreenApiInstanceStatusChange({ subscriptionId });
  return {
    status:
      greenApiInstanceInfo?.status ??
      GreenApiInstanceStatus.MISSING_GREEN_API_INSTANCE_INFO,
    phoneNumber: greenApiInstanceInfo?.wid,
    onDisconnectWhatsapp: onLogout,
    pendingDisconnect: pendingLogout,
    qrCode: qr,
    pendingQr,
  };
};
