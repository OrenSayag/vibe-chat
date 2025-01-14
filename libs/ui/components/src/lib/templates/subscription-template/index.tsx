'use client';

import { FC } from 'react';
import { cn } from '@monday-whatsapp/utils';
import { Box, Heading } from '@vibe/core';
import {
  ActivatedItem,
  ActivationItemsList,
  DeactivatedItem,
} from '../../organisms/activation-items-list';

interface Props {
  className?: string;
  activatedWorkspaces: ActivatedItem[];
  deactivatedWorkspaces: DeactivatedItem[];
}

export const SubscriptionTemplate: FC<Props> = ({
  className,
  activatedWorkspaces,
  deactivatedWorkspaces,
}) => {
  return (
    <>
      <Box className={cn(className)}>
        <Heading>Subscription</Heading>
        <Box>
          <Heading type={'h3'}>Chat Activation in Workspaces</Heading>
          <ActivationItemsList
            activatedItems={activatedWorkspaces}
            deactivatedItems={deactivatedWorkspaces}
          />
        </Box>
      </Box>
    </>
  );
};
