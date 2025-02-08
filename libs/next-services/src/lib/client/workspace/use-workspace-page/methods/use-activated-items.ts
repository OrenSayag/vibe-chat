import { ActivatedItem } from '@vibe-chat/shared-types';
import { useBackendRequest } from '@vibe-chat/next-services';
import { updateWorkspace } from '../../../../server/workspace/update-workspace';
import { useCallback, useMemo } from 'react';

type Input = {
  subscriptionId?: number;
  activatedBoards: ActivatedItem[];
  workspaceId?: number;
  getSubscription(): void;
};

export const useActivatedItems = ({
  activatedBoards,
  subscriptionId,
  workspaceId,
  getSubscription,
}: Input) => {
  const { pending, startAction } = useBackendRequest<
    undefined,
    Parameters<typeof updateWorkspace>[0]
  >({
    apiCall: updateWorkspace,
    onSuccess: getSubscription,
  });
  const onToggleActivation = useCallback(
    (itemId: string) => {
      if (!workspaceId || !subscriptionId) return;
      startAction({
        subscriptionId,
        data: {
          activatedBoards: activatedBoards.some((w) => w.value.id == itemId)
            ? activatedBoards
                .filter((w) => w.value.id != itemId)
                .map((w) => w.value.id)
            : [...activatedBoards.map((w) => w.value.id), itemId],
        },
        workspaceId,
      });
    },
    [workspaceId, activatedBoards]
  );
  return {
    onToggleActivation,
    pendingToggleActivation: pending,
  };
};
