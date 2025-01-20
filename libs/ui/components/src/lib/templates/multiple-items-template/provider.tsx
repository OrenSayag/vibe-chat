'use client';

import { FC, useEffect } from 'react';
import { MultipleItemsTemplate } from './index';
import {
  AuthStateError,
  AuthStateLoading,
  AuthStateNotAllowed,
  useGetSubscription,
  useMultipleItemsPage,
} from '@monday-whatsapp/next-services';

export const MultipleItemsTemplateProvider: FC = () => {
  const { subscriptionData } = useGetSubscription();
  const { singleMessageSenderProps, authState } = useMultipleItemsPage({
    subscriptionId: subscriptionData?.id,
    subscriptionInfo: subscriptionData?.info,
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
      <MultipleItemsTemplate
        singleMessageSenderProps={singleMessageSenderProps}
      />
    </>
  );
};
