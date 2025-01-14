import { useBackendRequest } from '@monday-whatsapp/next-services';
import { updateSubscription } from '../../../server/subscription/update-subscription';
import { ActivatedItem } from '@monday-whatsapp/shared-types';

type Input = {
  subscriptionId: string;
  activatedWorkspaces: ActivatedItem[];
};

export const useSubscriptionPage = ({
  subscriptionId,
  activatedWorkspaces,
}: Input) => {
  const { pending, startAction } = useBackendRequest<
    undefined,
    Parameters<typeof updateSubscription>[0]
  >({
    apiCall: updateSubscription,
  });
  return {
    onToggleActivation(itemId: string) {
      startAction({
        subscriptionId,
        data: {
          activatedWorkspaces: activatedWorkspaces.some(
            (w) => w.value.id == itemId
          )
            ? activatedWorkspaces
                .filter((w) => w.value.id != itemId)
                .map((w) => w.value.id)
            : [...activatedWorkspaces.map((w) => w.value.id), itemId],
        },
      });
    },
    pendingToggleActivation: pending,
  };
};
