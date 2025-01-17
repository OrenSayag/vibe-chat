'use client';

import { ComponentPropsWithoutRef, FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Box, Heading } from '@vibe/core';
import { ActivationItemsList } from '../../organisms/activation-items-list';
import { ActivatedItem, DeactivatedItem } from '@monday-whatsapp/shared-types';
import { ConnectedGreenApiInstance } from '../../organisms/conncted-green-api-instance-section';

interface Props {
  className?: string;
  activatedWorkspaces: ActivatedItem[];
  deactivatedWorkspaces: DeactivatedItem[];
  onToggleActivation(itemId: string): void;
  pendingToggleActivation?: boolean;
  greenApiInstanceProps: ComponentPropsWithoutRef<
    typeof ConnectedGreenApiInstance
  >;
}

export const SubscriptionTemplate: FC<Props> = ({
  className,
  activatedWorkspaces,
  deactivatedWorkspaces,
  onToggleActivation,
  pendingToggleActivation,
  greenApiInstanceProps,
}) => {
  return (
    <>
      <Box className={cn(className)}>
        <Heading>Subscription</Heading>
        <Box marginY={'large'}>
          <ConnectedGreenApiInstance {...greenApiInstanceProps} />
        </Box>
        <Box>
          <Heading type={'h3'}>Chat Activation in Workspaces</Heading>
          <Box marginY={'small'}>
            <ActivationItemsList
              onToggleActivation={onToggleActivation}
              activatedItems={activatedWorkspaces}
              deactivatedItems={deactivatedWorkspaces}
              pendingToggleActivation={pendingToggleActivation}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
