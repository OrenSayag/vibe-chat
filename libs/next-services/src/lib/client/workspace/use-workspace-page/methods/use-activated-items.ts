import { ActivatedItem } from '@monday-whatsapp/shared-types';
import { useBackendRequest } from '@monday-whatsapp/next-services';
import { updateWorkspace } from '../../../../server/workspace/update-workspace';
import { useCallback, useMemo } from 'react';

type Input = {
  subscriptionId: number;
  activatedBoards: ActivatedItem[];
  workspaceId?: number;
};

export const useActivatedItems = ({
  activatedBoards,
  subscriptionId,
  workspaceId,
}: Input) => {
  const { pending, startAction } = useBackendRequest<
    undefined,
    Parameters<typeof updateWorkspace>[0]
  >({
    apiCall: updateWorkspace,
  });
  const onToggleActivation = useCallback(
    (itemId: string) => {
      if (!workspaceId) return;
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
