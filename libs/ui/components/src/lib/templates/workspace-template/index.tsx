'use client';

import { FC, useEffect, useState } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Box, Loader, Text } from '@vibe/core';
import { GetAuthState } from '@monday-whatsapp/shared-types';
import { monday } from '@monday-whatsapp/monday';

interface Props {
  className?: string;
  activatedWorkspaceIds: string[];
  subscriptionId: number;
}

export const WorkspaceTemplate: FC<Props> = ({
  className,
  subscriptionId,
  activatedWorkspaceIds,
}) => {
  const { authState } = useAuth(activatedWorkspaceIds);

  if (authState === 'loading') {
    // TODO implement skeleton
    return (
      <Box>
        <Loader />
      </Box>
    );
  }
  if (authState === 'not-allowed') {
    return <NotAllowed />;
  }
  return (
    <>
      <Box className={cn(className)}>
        <Text>Hello from activated workspace</Text>
      </Box>
    </>
  );
};

function NotAllowed() {
  return (
    <Box>
      <Text>Workspace not activated for using monday Chat</Text>;
    </Box>
  );
}

export function useAuth(allowedItemIds: string[]) {
  const [authState, setAuthState] = useState<GetAuthState>('loading');
  useEffect(() => {
    monday.get('context').then((res) => {
      const workspaceId = (res.data as any).workspaceId;
      if (!allowedItemIds.includes(workspaceId.toString())) {
        setAuthState('not-allowed');
      } else {
        setAuthState('allowed');
      }
    });
  }, []);
  return { authState };
}
