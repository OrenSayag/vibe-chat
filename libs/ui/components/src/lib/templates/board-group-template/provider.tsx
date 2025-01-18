'use client';

import { FC } from 'react';
import { BoardGroupTemplate } from './index';
import { SubscriptionInfo } from '@monday-whatsapp/shared-types';
import {
  AuthStateError,
  AuthStateLoading,
  AuthStateNotAllowed,
  useBoardLevelAuth,
} from '@monday-whatsapp/next-services';

interface Props {
  subscriptionId: number;
  subscriptionInfo: SubscriptionInfo;
}

export const BoardGroupTemplateProvider: FC<Props> = ({
  subscriptionId,
  subscriptionInfo,
}) => {
  const { board, workspaceId, authState } = useBoardLevelAuth({
    subscriptionInfo,
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
      <BoardGroupTemplate />
    </>
  );
};
