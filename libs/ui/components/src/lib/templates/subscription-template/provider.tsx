'use client';

import { FC } from 'react';
import { cn } from '@monday-whatsapp/utils';
import { ActivatedItem, DeactivatedItem } from '@monday-whatsapp/shared-types';
import { useSubscriptionPage } from '@monday-whatsapp/next-services';
import { SubscriptionTemplate } from '@monday-whatsapp/components';

interface Props {
  className?: string;
  activatedWorkspaces: ActivatedItem[];
  deactivatedWorkspaces: DeactivatedItem[];
  subscriptionId: string;
}

export const SubscriptionTemplateProvider: FC<Props> = ({
  className,
  subscriptionId,
  activatedWorkspaces,
  deactivatedWorkspaces,
}) => {
  const { onToggleActivation, pendingToggleActivation } = useSubscriptionPage({
    subscriptionId,
    activatedWorkspaces,
  });
  return (
    <>
      <SubscriptionTemplate
        className={cn(className)}
        onToggleActivation={onToggleActivation}
        pendingToggleActivation={pendingToggleActivation}
        deactivatedWorkspaces={deactivatedWorkspaces}
        activatedWorkspaces={activatedWorkspaces}
      />
    </>
  );
};
