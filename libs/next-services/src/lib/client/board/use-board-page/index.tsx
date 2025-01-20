import { Board } from '@monday-whatsapp/shared-types';
import { useUpdateBoard } from './methods/use-update-board';

type Input = {
  subscriptionId?: number;
  workspaceId?: number;
  board?: Board;
};

type Output = {
  onSelectDefaultPhoneColumn(id: string): void;
  pendingSelectDefaultPhoneColumn?: boolean;
};

export const useBoardPage = ({
  subscriptionId,
  board,
  workspaceId,
}: Input): Output => {
  const { startUpdateBoard, pendingUpdateBoard } = useUpdateBoard();
  return {
    onSelectDefaultPhoneColumn(id: string) {
      if (!board || !workspaceId) {
        return;
      }
      startUpdateBoard({
        boardId: board.id,
        subscriptionId: subscriptionId!,
        workspaceId,
        data: {
          defaultPhoneColumnId: id,
        },
      });
    },
    pendingSelectDefaultPhoneColumn: pendingUpdateBoard,
  };
};
