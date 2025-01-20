'use client';

import { FC } from 'react';
import { useSubscriptionPage } from '@monday-whatsapp/next-services';
import { SubscriptionTemplate } from '.';

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
    return 'loading';
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
