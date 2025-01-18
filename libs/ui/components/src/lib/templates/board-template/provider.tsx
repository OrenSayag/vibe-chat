'use client';

import { FC, useEffect, useState } from 'react';
import {
  Board,
  BoardColumn,
  GetAuthState,
  SubscriptionInfo,
} from '@monday-whatsapp/shared-types';
import { monday } from '@monday-whatsapp/monday';
import { Box, Text } from '@vibe/core';
import { BoardTemplate } from './index';
import { useBoardPage } from '@monday-whatsapp/next-services';

interface Props {
  className?: string;
  subscriptionInfo: SubscriptionInfo;
  subscriptionId: number;
}

export const BoardTemplateProvider: FC<Props> = ({
  className,
  subscriptionId,
  subscriptionInfo,
}) => {
  const { authState, board, workspaceId } = useAuth(subscriptionInfo);

  const props = useBoardPage({
    board,
    subscriptionId,
    workspaceId,
  });

  if (authState === 'loading') {
    return <Loading />;
  }
  if (authState === 'error') {
    return <Error />;
  }
  if (
    authState === 'workspace-not-allowed' ||
    authState === 'board-not-allowed'
  ) {
    return <NotAllowed type={authState} />;
  }

  if (!board) {
    return <Loading />;
  }

  return (
    <>
      <BoardTemplate {...props} board={board} />
    </>
  );
};
function useAuth(subscriptionInfo: SubscriptionInfo) {
  const [authState, setAuthState] = useState<GetAuthState>('loading');
  const [board, setBoard] = useState<Board>();
  const [workspaceId, setWorkspaceId] = useState<number>();
  useEffect(() => {
    monday.get('context').then((res) => {
      const workspaceId = (res.data as any).workspaceId;
      setWorkspaceId(workspaceId);
      const boardId = (res.data as any).boardId;
      const allowedWorkspace = subscriptionInfo.activatedWorkspaces.find(
        (w) => w.id == workspaceId
      );
      const allowedBoard = allowedWorkspace?.activatedBoards.find(
        (activatedBoard) => activatedBoard.id == boardId
      );
      if (!allowedWorkspace) {
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
                  columns: BoardColumn;
                };
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
  return { authState, board, workspaceId };
}

function NotAllowed({
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
      ;
    </Box>
  );
}

function Loading() {
  // TODO implement skeleton
  return (
    <Box>
      <Text>Loading...</Text>
    </Box>
  );
}

function Error() {
  return (
    <Box>
      <Text>Error</Text>
    </Box>
  );
}
