'use client';

import { FC } from 'react';
import { useSubscriptionPage } from '@monday-whatsapp/next-services';
import { SubscriptionTemplate } from '.';
import { Text } from '@vibe/core';
import { UnConfiguredAccountTemplate } from '../unconfigured-account-template';

export const SubscriptionTemplateProvider: FC = () => {
  const {
    onToggleActivation,
    pendingToggleActivation,
    deactivatedWorkspaces,
    activatedWorkspaces,
    loading,
    accountNotConfigured,
  } = useSubscriptionPage();
  if (loading) {
    return <Text>loading</Text>;
  }
  if (accountNotConfigured) {
    return <UnConfiguredAccountTemplate />;
  }
  return (
    <>
      <SubscriptionTemplate
        onToggleActivation={onToggleActivation}
        pendingToggleActivation={pendingToggleActivation}
        deactivatedWorkspaces={deactivatedWorkspaces}
        activatedWorkspaces={activatedWorkspaces}
      />
    </>
  );
};
