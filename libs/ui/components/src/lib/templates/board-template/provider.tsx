'use client';

import { FC } from 'react';
import { BoardTemplate } from './index';
import {
  AuthStateError,
  AuthStateLoading,
  AuthStateNotAllowed,
  useBoardLevelAuth,
  useBoardPage,
  useGetSubscription,
} from '@monday-whatsapp/next-services';

export const BoardTemplateProvider: FC = () => {
  const { subscriptionData } = useGetSubscription();

  const { authState, board, workspaceId } = useBoardLevelAuth({
    subscriptionInfo: subscriptionData?.info,
  });

  const props = useBoardPage({
    board,
    subscriptionId: subscriptionData?.id,
    workspaceId,
  });

  if (authState === 'loading') {
    return <AuthStateLoading />;
  }
  if (authState === 'error') {
    return <AuthStateError />;
  }
  if (
    authState === 'workspace-not-allowed' ||
    authState === 'board-not-allowed'
  ) {
    return <AuthStateNotAllowed type={authState} />;
  }

  if (!board) {
    return <AuthStateLoading />;
  }

  return (
    <>
      <BoardTemplate {...props} board={board} />
    </>
  );
};
