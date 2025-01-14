'use server';

import { Workspace } from '@monday-whatsapp/shared-types';
import { monday } from '../monday-sdk-instance';

type Output = { workspaces: Workspace[]; accountId: string };

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
        token: process.env['DEV_API_TOKEN'],
      }
    );
    return {
      workspaces: workspaces.data.workspaces.map(
        (w: { id: string; name: string }) =>
          ({
            id: w.id,
            name: w.name,
          } as Workspace)
      ),
      accountId: workspaces.account_id.toString(),
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
