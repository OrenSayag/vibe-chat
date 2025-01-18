'use client';

import { FC, useEffect } from 'react';
import { ItemTemplate } from './index';
import { SubscriptionInfo } from '@monday-whatsapp/shared-types';
import {
  AuthStateError,
  AuthStateLoading,
  AuthStateNotAllowed,
  useItemPage,
} from '@monday-whatsapp/next-services';

interface Props {
  subscriptionId: number;
  subscriptionInfo: SubscriptionInfo;
}

export const ItemTemplateProvider: FC<Props> = ({
  subscriptionId,
  subscriptionInfo,
}) => {
  const { authState, singleMessageSenderProps } = useItemPage({
    subscriptionId,
    subscriptionInfo,
  });
  useEffect(() => {
    console.log({
      authState,
      singleMessageSenderProps,
    });
  }, [authState, JSON.stringify(singleMessageSenderProps)]);
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
