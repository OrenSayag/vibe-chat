'use client';

import { FC, useEffect, useState } from 'react';
import {
  GetAuthState,
  SubscriptionInfo,
  Workspace,
} from '@vibe-chat/shared-types';
import { getWorkspace, monday } from '@vibe-chat/monday';
import { Box, Loader, Text } from '@vibe/core';
import { useGetSubscription, useWorkspacePage } from '@vibe-chat/next-services';
import { WorkspaceTemplate } from './index';
import { UnConfiguredAccountTemplate } from '../unconfigured-account-template';

export const WorkspaceTemplateProvider: FC = () => {
  const {
    subscriptionData,
    getSubscription,
    pendingGetSubscription,
    accountNotConfigured,
  } = useGetSubscription();

  const { authState, workspace } = useAuth(subscriptionData?.info);

  const {
    onToggleActivation,
    pendingToggleActivation,
    activatedBoards,
    deactivatedBoards,
  } = useWorkspacePage({
    subscriptionId: subscriptionData?.id,
    workspace,
    getSubscription,
  });

  if (authState === 'loading') {
    // TODO implement skeleton
    return (
      <Box>
        <Loader />
      </Box>
    );
  }
  if (accountNotConfigured) {
    return <UnConfiguredAccountTemplate />;
  }
  if (authState === 'workspace-not-allowed') {
    return <NotAllowed />;
  }

  return (
    <>
      <WorkspaceTemplate
        onToggleActivation={onToggleActivation}
        pendingToggleActivation={
          pendingToggleActivation || pendingGetSubscription
        }
        activatedBoards={activatedBoards}
        deactivatedBoards={deactivatedBoards}
        subscriptionId={subscriptionData!.id}
      />
    </>
  );
};

function useAuth(subscriptionInfo?: SubscriptionInfo) {
  const [authState, setAuthState] = useState<GetAuthState>('loading');
  const [workspace, setWorkspace] = useState<Workspace>();
  const [data, setData] = useState<{
    boards?: { id: string; name: string }[];
    workspaces?: { id: string; name: string }[];
  }>();
  useEffect(() => {
    if (!subscriptionInfo) {
      return;
    }
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
      <Text>Workspace not activated for using monday Chat</Text>
    </Box>
  );
}
