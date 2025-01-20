import { monday } from './monday-sdk-instance';
import { ActivatedItem } from '@monday-whatsapp/shared-types';

type Output = {
  workspaces: ActivatedItem[];
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
}`
    );

    return {
      workspaces: workspaces.data.workspaces.map(
        (w: { id: string; name: string }) =>
          ({
            label: w.name,
            value: {
              id: w.id,
            },
          } as ActivatedItem)
      ),
      accountId: workspaces.account_id.toString(),
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};
