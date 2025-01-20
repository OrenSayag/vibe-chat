import { useBackendRequest } from '@monday-whatsapp/next-services';
import { logout } from '../../../../server/green-api/logout';

type Input = {
  subscriptionId?: number;
};

export const useGreenApiLogout = ({ subscriptionId }: Input) => {
  const { pending, startAction } = useBackendRequest<
    undefined,
    Parameters<typeof logout>[0]
  >({
    apiCall: logout,
  });
  return {
    onLogout: () => {
      if (!subscriptionId) {
        return;
      }
      startAction({ subscriptionId });
    },
    pendingLogout: pending,
  };
};
