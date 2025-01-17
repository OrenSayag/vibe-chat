import {
  ActivatedItem,
  DeactivatedItem,
  Workspace,
} from '@monday-whatsapp/shared-types';
import { useActivatedItems } from './methods/use-activated-items';
import { useEffect, useState } from 'react';

type Input = {
  subscriptionId: number;
  workspace?: Workspace;
};

export const useWorkspacePage = ({ subscriptionId, workspace }: Input) => {
  const { activatedBoards, deactivatedBoards } = useBoards({ workspace });
  const { onToggleActivation, pendingToggleActivation } = useActivatedItems({
    workspaceId: workspace?.value.id ? Number(workspace?.value.id) : undefined,
    activatedBoards,
    subscriptionId,
  });
  return {
    onToggleActivation,
    pendingToggleActivation,
    activatedBoards,
    deactivatedBoards,
  };
};

function useBoards({ workspace }: { workspace?: Input['workspace'] }) {
  const [data, setData] = useState<{
    activatedBoards: ActivatedItem[];
    deactivatedBoards: DeactivatedItem[];
  }>({
    activatedBoards: [],
    deactivatedBoards: [],
  });
  useEffect(() => {
    if (!workspace) {
      return;
    }
    setData({
      activatedBoards: workspace.activatedBoards,
      deactivatedBoards: workspace.deactivatedBoards,
    });
  }, [JSON.stringify(workspace)]);
  return data;
}
