import { WorkspaceItem } from '@monday-whatsapp/shared-types';
import { monday } from '@monday-whatsapp/utils';
import { getDevToken } from './get-dev-token';

type Output = {
  workspaces: WorkspaceItem[];
  accountId: string;
};

export const getWorkspaces = async (): Promise<Output> => {
  try {
    const workspaces = await monday.api(
      `query {
  workspaces {
    id
    name
    kind
    description
  }
}`,
      {
        token: getDevToken(),
      }
    );

    return {
      workspaces: workspaces.data.workspaces.map(
        (w: { id: string; name: string }) =>
          ({
            id: w.id,
            name: w.name,
          } as WorkspaceItem)
      ),
      accountId: workspaces.account_id.toString(),
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
