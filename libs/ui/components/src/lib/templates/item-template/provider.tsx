'use client';

import { FC } from 'react';
import { ItemTemplate } from './index';
import {
  AuthStateError,
  AuthStateLoading,
  AuthStateNotAllowed,
  useGetSubscription,
  useItemPage,
} from '@vibe-chat/next-services';
import { UnConfiguredAccountTemplate } from '../unconfigured-account-template';

export const ItemTemplateProvider: FC = () => {
  const { subscriptionData, accountNotConfigured } = useGetSubscription();

  const { authState, singleMessageSenderProps } = useItemPage({
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
      <ItemTemplate singleMessageSenderProps={singleMessageSenderProps} />
    </>
  );
};
