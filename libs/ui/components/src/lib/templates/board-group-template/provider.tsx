'use client';

import { FC } from 'react';
import { BoardGroupTemplate } from './index';
import {
  AuthStateError,
  AuthStateLoading,
  AuthStateNotAllowed,
  useBoardGroupPage,
  useGetSubscription,
} from '@vibe-chat/next-services';
import { UnConfiguredAccountTemplate } from '../unconfigured-account-template';

export const BoardGroupTemplateProvider: FC = () => {
  const { subscriptionData, accountNotConfigured } = useGetSubscription();
  const { authState, singleMessageSenderProps } = useBoardGroupPage({
    subscriptionId: subscriptionData?.id,
    subscriptionInfo: subscriptionData?.info,
  });
  if (authState === 'loading') {
    return <AuthStateLoading />;
  }
  if (authState === 'error') {
    return <AuthStateError />;
  }
  if (accountNotConfigured) {
    return <UnConfiguredAccountTemplate />;
  }
  if (
    authState === 'workspace-not-allowed' ||
    authState === 'board-not-allowed'
  ) {
    return <AuthStateNotAllowed type={authState} />;
  }

  if (
    !singleMessageSenderProps.boardColumns ||
    !singleMessageSenderProps.items
  ) {
    return <AuthStateLoading />;
  }

  return (
    <>
      <BoardGroupTemplate singleMessageSenderProps={singleMessageSenderProps} />
    </>
  );
};
