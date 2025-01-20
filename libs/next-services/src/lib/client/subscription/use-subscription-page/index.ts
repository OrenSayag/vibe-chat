import {
  ActivatedItem,
  DeactivatedItem,
  SubscriptionInfo,
} from '@monday-whatsapp/shared-types';
import { useActivatedItems } from './methods/use-activated-items';
import { useGreenApiInstance } from './methods/use-green-api-instance';
import { useCallback, useEffect, useState } from 'react';
import { getWorkspaces, monday } from '@monday-whatsapp/monday';
import { useGetSubscription } from '../use-get-subscription';

export const useSubscriptionPage = () => {
  const { getSubscription, subscriptionData, pendingGetSubscription } =
    useGetSubscription();
  const { workspaces } = useWorkspaces({
    subscriptionInfo: subscriptionData?.info,
  });
  const { pendingToggleActivation, onToggleActivation } = useActivatedItems({
    subscriptionId: subscriptionData?.id,
    activatedWorkspaces: workspaces?.activated ?? [],
    getSubscription,
  });
  const greenApiInstanceSectionProps = useGreenApiInstance({
    greenApiInstanceInfo: subscriptionData?.greenApiInstanceInfo,
    id: subscriptionData?.id,
  });
  return {
    onToggleActivation,
    pendingToggleActivation: pendingToggleActivation || pendingGetSubscription,
    greenApiInstanceSectionProps,
    deactivatedWorkspaces: workspaces?.deactivated ?? [],
    activatedWorkspaces: workspaces?.activated ?? [],
    loading: !subscriptionData,
  };
};

function useWorkspaces({
  subscriptionInfo,
}: {
  subscriptionInfo?: SubscriptionInfo;
}) {
  const [workspaces, setWorkspaces] = useState<{
    activated: ActivatedItem[];
    deactivated: DeactivatedItem[];
  }>();

  const get = useCallback(() => {
    if (!subscriptionInfo) {
      return;
    }
    monday.get('context').then((res) => {
      getWorkspaces().then((res) => {
        console.log({
          getWorkspacesRes: res,
        });
        setWorkspaces({
          activated: res.workspaces
            .filter((w) =>
              subscriptionInfo.activatedWorkspaces.some(
                (aw) => aw.id == w.value.id
              )
            )
            .map((w) => ({
              ...w,
              value: {
                ...w.value,
                activationDate: subscriptionInfo.activatedWorkspaces.find(
                  (aw) => aw.id == w.value.id
                )?.activationTime!,
              },
            })),
          deactivated: res.workspaces!.filter(
            (w) =>
              !subscriptionInfo.activatedWorkspaces.some(
                (aw) => aw.id == w.value.id
              )
          ),
        });
      });
    });
  }, [subscriptionInfo]);

  useEffect(() => {
    get();
  }, [subscriptionInfo]);
  return {
    workspaces,
  };
}
