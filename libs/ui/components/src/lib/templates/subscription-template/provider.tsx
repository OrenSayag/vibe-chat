'use client';

import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import {
  ActivatedItem,
  DeactivatedItem,
  GetSubscriptionInfoResponse,
} from '@monday-whatsapp/shared-types';
import { useSubscriptionPage } from '@monday-whatsapp/next-services';
import { SubscriptionTemplate } from '.';

interface Props {
  className?: string;
  activatedWorkspaces: ActivatedItem[];
  deactivatedWorkspaces: DeactivatedItem[];
  subscriptionId: number;
  greenApiInstanceInfo: GetSubscriptionInfoResponse['data']['greenApiInstanceInfo'];
}

export const SubscriptionTemplateProvider: FC<Props> = ({
  className,
  subscriptionId,
  activatedWorkspaces,
  deactivatedWorkspaces,
  greenApiInstanceInfo,
}) => {
  const {
    onToggleActivation,
    pendingToggleActivation,
    greenApiInstanceSectionProps,
  } = useSubscriptionPage({
    subscriptionId,
    activatedWorkspaces,
    greenApiInstanceInfo,
  });
  return (
    <>
      <SubscriptionTemplate
        className={cn(className)}
        onToggleActivation={onToggleActivation}
        pendingToggleActivation={pendingToggleActivation}
        deactivatedWorkspaces={deactivatedWorkspaces}
        activatedWorkspaces={activatedWorkspaces}
        greenApiInstanceProps={greenApiInstanceSectionProps}
      />
    </>
  );
};
