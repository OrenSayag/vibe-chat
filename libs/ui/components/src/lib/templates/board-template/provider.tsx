'use client';

import { FC, useEffect, useState } from 'react';
import {
  Board,
  GetAuthState,
  SubscriptionInfo,
} from '@monday-whatsapp/shared-types';
import { monday } from '@monday-whatsapp/monday';
import { Box, Loader, Text } from '@vibe/core';
import { BoardTemplate } from './index';

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
  const { authState, board } = useAuth(subscriptionInfo);

  if (authState === 'loading') {
    // TODO implement skeleton
    return (
      <Box>
        <Loader />
      </Box>
    );
  }
  if (
    authState === 'workspace-not-allowed' ||
    authState === 'board-not-allowed'
  ) {
    return <NotAllowed type={authState} />;
  }

  return (
    <>
      <BoardTemplate />
    </>
  );
};
function useAuth(subscriptionInfo: SubscriptionInfo) {
  const [authState, setAuthState] = useState<GetAuthState>('loading');
  const [board, setBoard] = useState<Board>();
  useEffect(() => {
    monday.get('context').then((res) => {
      const workspaceId = (res.data as any).workspaceId;
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
        setBoard({ id: boardId });
        setAuthState('allowed');
      }
    });
  }, [JSON.stringify(subscriptionInfo)]);
  return { authState, board };
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
