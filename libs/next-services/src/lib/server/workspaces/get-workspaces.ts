'use server';

import { Workspace } from '@monday-whatsapp/shared-types';
import { monday } from '../monday-sdk-instance';

type Output = Workspace[];

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
    return workspaces.data.workspaces.map(
      (w: { id: string; name: string }) =>
        ({
          id: w.id,
          name: w.name,
        } as Workspace)
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};
