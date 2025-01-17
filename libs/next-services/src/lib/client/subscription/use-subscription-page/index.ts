import {
  ActivatedItem,
  GetSubscriptionInfoResponse,
} from '@monday-whatsapp/shared-types';
import { useActivatedItems } from './methods/use-activated-items';
import { useGreenApiInstance } from './methods/use-green-api-instance';

type Input = {
  subscriptionId: number;
  activatedWorkspaces: ActivatedItem[];
  greenApiInstanceInfo: GetSubscriptionInfoResponse['data']['greenApiInstanceInfo'];
};

export const useSubscriptionPage = ({
  subscriptionId,
  activatedWorkspaces,
  greenApiInstanceInfo,
}: Input) => {
  const { pendingToggleActivation, onToggleActivation } = useActivatedItems({
    subscriptionId,
    activatedWorkspaces,
  });
  const greenApiInstanceSectionProps = useGreenApiInstance({
    greenApiInstanceInfo,
    id: subscriptionId,
  });
  return {
    onToggleActivation,
    pendingToggleActivation,
    greenApiInstanceSectionProps,
  };
};
