'use client';

import { FC, useEffect, useState } from 'react';
import { WorkspaceTemplate } from '@monday-whatsapp/components';
import {
  GetAuthState,
  SubscriptionInfo,
  Workspace,
} from '@monday-whatsapp/shared-types';
import { getWorkspace, monday } from '@monday-whatsapp/monday';
import { Box, Loader, Text } from '@vibe/core';
import { useWorkspacePage } from '@monday-whatsapp/next-services';

interface Props {
  subscriptionInfo: SubscriptionInfo;
  subscriptionId: number;
}

export const WorkspaceTemplateProvider: FC<Props> = ({
  subscriptionId,
  subscriptionInfo,
}) => {
  const { authState, workspace } = useAuth(subscriptionInfo);

  const {
    onToggleActivation,
    pendingToggleActivation,
    activatedBoards,
    deactivatedBoards,
  } = useWorkspacePage({
    subscriptionId,
    workspace,
  });

  if (authState === 'loading') {
    // TODO implement skeleton
    return (
      <Box>
        <Loader />
      </Box>
    );
  }
  if (authState === 'workspace-not-allowed') {
    return <NotAllowed />;
  }

  return (
    <>
      <WorkspaceTemplate
        onToggleActivation={onToggleActivation}
        pendingToggleActivation={pendingToggleActivation}
        activatedBoards={activatedBoards}
        deactivatedBoards={deactivatedBoards}
        subscriptionId={subscriptionId}
      />
    </>
  );
};

function useAuth(subscriptionInfo: SubscriptionInfo) {
  const [authState, setAuthState] = useState<GetAuthState>('loading');
  const [workspace, setWorkspace] = useState<Workspace>();
  const [data, setData] = useState<{
    boards?: { id: string; name: string }[];
    workspaces?: { id: string; name: string }[];
  }>();
  useEffect(() => {
    monday.get('context').then((res) => {
      const workspaceId = (res.data as any).workspaceId;
      if (
        !subscriptionInfo.activatedWorkspaces.some((w) => w.id == workspaceId)
      ) {
        setAuthState('workspace-not-allowed');
      } else {
        getWorkspace({
          workspaceId,
          subscriptionInfo,
          ...data,
        })
          .then((w) => {
            setWorkspace(w.workspace);
            setAuthState('allowed');
            setData({
              boards: w.boards,
              workspaces: w.workspaces,
            });
          })
          .catch((e) => {
            console.error(e);
            throw new Error('Failed to get workspace.');
          });
      }
    });
  }, [JSON.stringify(subscriptionInfo)]);
  return { authState, workspace };
}

function NotAllowed() {
  return (
    <Box>
      <Text>Workspace not activated for using monday Chat</Text>;
    </Box>
  );
}
