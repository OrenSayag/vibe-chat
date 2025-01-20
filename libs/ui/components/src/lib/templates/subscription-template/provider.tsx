'use client';

import { FC } from 'react';
import { useSubscriptionPage } from '@monday-whatsapp/next-services';
import { SubscriptionTemplate } from '.';
import { Text } from '@vibe/core';

export const SubscriptionTemplateProvider: FC = () => {
  const {
    onToggleActivation,
    pendingToggleActivation,
    deactivatedWorkspaces,
    activatedWorkspaces,
    greenApiInstanceSectionProps,
    loading,
  } = useSubscriptionPage();
  if (loading) {
    return <Text>loading</Text>;
  }
  return (
    <>
      <SubscriptionTemplate
        onToggleActivation={onToggleActivation}
        pendingToggleActivation={pendingToggleActivation}
        deactivatedWorkspaces={deactivatedWorkspaces}
        activatedWorkspaces={activatedWorkspaces}
        greenApiInstanceProps={greenApiInstanceSectionProps}
      />
    </>
  );
};
