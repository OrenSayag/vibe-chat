'use client';

import { FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Box, Heading } from '@vibe/core';
import { ActivatedItem, DeactivatedItem } from '@monday-whatsapp/shared-types';
import { ActivationItemsList } from '../../organisms/activation-items-list';

interface Props {
  className?: string;
  activatedBoards: ActivatedItem[];
  deactivatedBoards: DeactivatedItem[];
  subscriptionId: number;
  onToggleActivation(itemId: string): void;
  pendingToggleActivation?: boolean;
}

export const WorkspaceTemplate: FC<Props> = ({
  className,
  subscriptionId,
  activatedBoards,
  deactivatedBoards,
  pendingToggleActivation,
  onToggleActivation,
}) => {
  return (
    <>
      <Box className={cn(className)}>
        <Box>
          <Heading type={'h3'}>Chat Activation in Boards</Heading>
          <Box marginY={'small'}>
            <ActivationItemsList
              onToggleActivation={onToggleActivation}
              activatedItems={activatedBoards}
              deactivatedItems={deactivatedBoards}
              pendingToggleActivation={pendingToggleActivation}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
