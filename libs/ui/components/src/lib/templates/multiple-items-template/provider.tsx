'use client';

import { FC, useEffect } from 'react';
import { SubscriptionInfo } from '@monday-whatsapp/shared-types';
import { MultipleItemsTemplate } from './index';
import {
  AuthStateError,
  AuthStateLoading,
  AuthStateNotAllowed,
  useMultipleItemsPage,
} from '@monday-whatsapp/next-services';

interface Props {
  subscriptionId: number;
  subscriptionInfo: SubscriptionInfo;
}

export const MultipleItemsTemplateProvider: FC<Props> = ({
  subscriptionInfo,
  subscriptionId,
}) => {
  const { singleMessageSenderProps, authState } = useMultipleItemsPage({
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
      <MultipleItemsTemplate
        singleMessageSenderProps={singleMessageSenderProps}
      />
    </>
  );
};
