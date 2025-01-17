import {
  ActivatedItem,
  DeactivatedItem,
  SubscriptionInfo,
  Workspace,
} from '@monday-whatsapp/shared-types';
import { monday } from '@monday-whatsapp/monday';

type Input = {
  workspaceId: number;
  subscriptionInfo: SubscriptionInfo;
  boards?: { id: string; name: string }[];
  workspaces?: { id: string; name: string }[];
};

type Output = {
  workspace: Workspace;
  boards?: { id: string; name: string }[];
  workspaces?: { id: string; name: string }[];
};

export const getWorkspace = async ({
  workspaceId,
  subscriptionInfo,
  boards: _boards,
  workspaces: _workspaces,
}: Input): Promise<Output> => {
  const appWorkspaceData = subscriptionInfo.activatedWorkspaces.find(
    (w) => w.id == workspaceId.toString()
  )!;
  const {
    data: { boards },
  } = _boards
    ? { data: { boards: _boards } }
    : await monday.api(`
  query {
  boards(workspace_ids: [${workspaceId}]) {
    id
    name
  }
}
  `);
  const {
    data: { workspaces },
  } = _workspaces
    ? { data: { workspaces: _workspaces } }
    : await monday.api(`
 query {
  workspaces(ids: [${workspaceId}]) {
    id
    name
  }
}
  `);

  const appWorkspaceInfo = subscriptionInfo.activatedWorkspaces.find(
    (w) => w.id == workspaceId.toString()
  )!;

  const activatedBoards: ActivatedItem[] = boards
    .filter((b: { id: string; name: string }) => {
      return appWorkspaceInfo.activatedBoards.some((ab) => ab.id == b.id);
    })
    .map(
      (b: { id: string; name: string }) =>
        ({
          label: b.name,
          value: {
            id: b.id,
            activationDate: appWorkspaceInfo.activatedBoards.find(
              (ab) => ab.id == b.id
            )!.activationTime,
          },
        } as ActivatedItem)
    );
  const deactivatedBoards: DeactivatedItem[] = boards
    .filter((b: { id: string; name: string }) => {
      return !appWorkspaceInfo.activatedBoards.some((ab) => ab.id == b.id);
    })
    .map(
      (b: { id: string; name: string }) =>
        ({
          label: b.name,
          value: {
            id: b.id,
          },
        } as DeactivatedItem)
    );

  return {
    boards,
    workspaces,
    workspace: {
      label: workspaces.find(
        (w: { id: string; number: string }) => w.id == workspaceId.toString()
      )!.name,
      value: {
        activationDate: appWorkspaceData.activationTime,
        id: workspaceId.toString(),
      },
      activatedBoards,
      deactivatedBoards,
    },
  };
};
