import { useEffect, useState } from 'react';
import {
  Board,
  BoardColumn,
  GetAuthState,
  SubscriptionInfo,
} from '@monday-whatsapp/shared-types';
import { monday } from '@monday-whatsapp/monday';
import { Box, Text } from '@vibe/core';

type Input = {
  subscriptionInfo?: SubscriptionInfo;
};

export const useBoardLevelAuth = ({ subscriptionInfo }: Input) => {
  const [authState, setAuthState] = useState<GetAuthState>('loading');
  const [board, setBoard] = useState<Board>();
  const [workspaceId, setWorkspaceId] = useState<number>();
  const [groupId, setGroupId] = useState<string>();
  useEffect(() => {
    if (!subscriptionInfo) {
      return;
    }
    monday.get('context').then((res) => {
      const workspaceId: number | undefined = (res.data as any).workspaceId;
      const groupId: string | undefined = (res.data as any).groupId;
      if (workspaceId) {
        setWorkspaceId(workspaceId);
      }
      if (groupId) {
        setGroupId(groupId);
      }
      const boardId = (res.data as any).boardId;
      let allowedWorkspace;
      if (workspaceId) {
        allowedWorkspace = subscriptionInfo.activatedWorkspaces.find(
          (w) => w.id == workspaceId.toString()
        );
      }
      const allowedBoard = workspaceId
        ? allowedWorkspace?.activatedBoards.find(
            (activatedBoard) => activatedBoard.id == boardId
          )
        : subscriptionInfo.activatedWorkspaces
            .find((w) =>
              w.activatedBoards.some((b) => b.id == boardId.toString())
            )
            ?.activatedBoards.find(
              (activatedBoard) => activatedBoard.id == boardId.toString()
            );

      if (workspaceId && !allowedWorkspace) {
        setAuthState('workspace-not-allowed');
      } else if (!allowedBoard) {
        setAuthState('board-not-allowed');
      } else {
        monday
          .api(
            `
        query {
          boards(ids: [${boardId}]) {
            columns {
              id
              title
              type
            }
          }
        }
        `
          )
          .then(
            (res: {
              data: {
                boards: {
                  columns: BoardColumn[];
                }[];
              };
            }) => {
              setBoard({
                id: boardId,
                columns: res.data.boards[0].columns,
                defaultPhoneColumnId: allowedBoard.defaultPhoneColumnId,
              });
              setAuthState('allowed');
            }
          )
          .catch((e) => {
            console.log(e);
            setAuthState('error');
          });
      }
    });
  }, [JSON.stringify(subscriptionInfo)]);
  return { authState, board, workspaceId, groupId };
};

export function AuthStateNotAllowed({
  type,
}: {
  type: 'workspace-not-allowed' | 'board-not-allowed';
}) {
  return (
    <Box>
      <Text>
        {type === 'workspace-not-allowed' && `The workspace is not allowed`}
        {type === 'board-not-allowed' && `The board is not allowed`}
      </Text>
    </Box>
  );
}

export function AuthStateLoading() {
  // TODO implement skeleton
  return (
    <Box>
      <Text>Loading...</Text>
    </Box>
  );
}

export function AuthStateError() {
  return (
    <Box>
      <Text>Error</Text>
    </Box>
  );
}
