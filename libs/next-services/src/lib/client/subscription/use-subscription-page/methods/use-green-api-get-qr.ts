import { useBackendRequest } from '@monday-whatsapp/next-services';
import { getQrCode } from '../../../../server/green-api/get-qr-code';
import {
  GetQrCodeResponse,
  GreenApiInstanceStatus,
} from '@monday-whatsapp/shared-types';
import { useState } from 'react';
import { useInterval } from '../../../utils/use-interval';

type Input = {
  subscriptionId?: number;
  instanceState?: GreenApiInstanceStatus;
};

export const useGreenApiGetQr = ({ subscriptionId, instanceState }: Input) => {
  const [qr, setQr] = useState<string>();
  const { pending, startAction } = useBackendRequest<
    GetQrCodeResponse['data'],
    Parameters<typeof getQrCode>[0]
  >({
    apiCall: getQrCode,
    onSuccess({ qr }) {
      setQr(qr);
    },
  });
  useInterval({
    interval: 10_000,
    cb() {
      if (instanceState !== GreenApiInstanceStatus.NOT_CONNECTED) {
        return;
      }
      if (!pending && subscriptionId) {
        startAction({
          subscriptionId,
        });
      }
    },
    deps: [instanceState, subscriptionId],
  });
  return {
    qr,
    pending,
  };
};
