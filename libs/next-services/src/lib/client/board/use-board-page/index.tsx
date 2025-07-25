import { Board, ChatProps } from '@vibe-chat/shared-types';
import { useUpdateBoard } from './methods/use-update-board';
import { useChat } from '../../chat/use-chat';

type Input = {
  subscriptionId?: number;
  workspaceId?: number;
  board?: Board;
};

type Output = {
  onSelectDefaultPhoneColumn(id: string): void;
  pendingSelectDefaultPhoneColumn?: boolean;
  chatProps: ChatProps;
};

export const useBoardPage = ({
  subscriptionId,
  board,
  workspaceId,
}: Input): Output => {
  const { startUpdateBoard, pendingUpdateBoard } = useUpdateBoard();
  const chatProps = useChat({
    subscriptionId,
  });
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
    chatProps,
  };
};
