import { useBackendRequest } from '@monday-whatsapp/next-services';
import { updateWorkspaceBoard } from '../../../../server/workspace/update-workspace-board';

export const useUpdateBoard = () => {
  const { pending: pendingUpdateBoard, startAction: startUpdateBoard } =
    useBackendRequest<undefined, Parameters<typeof updateWorkspaceBoard>[0]>({
      apiCall: updateWorkspaceBoard,
    });
  return {
    pendingUpdateBoard,
    startUpdateBoard,
  };
};
