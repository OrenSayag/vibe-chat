'use client';

import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Box, Heading } from '@vibe/core';
import { ActivationItemsList } from '../../organisms/activation-items-list';
import { ActivatedItem, DeactivatedItem } from '@monday-whatsapp/shared-types';

interface Props {
  className?: string;
  activatedWorkspaces: ActivatedItem[];
  deactivatedWorkspaces: DeactivatedItem[];
  onToggleActivation(itemId: string): void;
  pendingToggleActivation?: boolean;
}

export const SubscriptionTemplate: FC<Props> = ({
  className,
  activatedWorkspaces,
  deactivatedWorkspaces,
  onToggleActivation,
  pendingToggleActivation,
}) => {
  return (
    <>
      <Box className={cn(className)}>
        <Heading>Subscription</Heading>
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
