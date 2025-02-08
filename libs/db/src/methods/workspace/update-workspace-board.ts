import { UpdateBoardRequest } from '@monday-whatsapp/shared-types';
import { getSubscription } from '@monday-whatsapp/db';
import { db } from '../../config';
import { subscriptions } from '../../schema';
import { eq } from 'drizzle-orm';

type Input = {
  workspaceId: number;
  boardId: number;
  subscriptionId: string;
  data: UpdateBoardRequest;
};

export const updateWorkspaceBoard = async ({
  boardId,
  subscriptionId,
  workspaceId,
  data,
}: Input) => {
  const subscription = await getSubscription({
    type: 'subscriptionId',
    id: subscriptionId,
  });
  const boardIsActivated =
    subscription.info.integrations.monday?.activatedWorkspaces
      .find((w) => w.id == workspaceId.toString())
      ?.activatedBoards.find((b) => b.id == boardId.toString());
  if (!subscription || !boardIsActivated) {
    throw new Error('not found');
  }
  await db
    .update(subscriptions)
    .set({
      info: {
        ...subscription.info,
        integrations: {
          ...subscription.info.integrations,
          monday: {
            ...subscription.info.integrations.monday!,
            activatedWorkspaces:
              subscription.info.integrations.monday?.activatedWorkspaces.map(
                (workspace) => {
                  if (workspace.id == workspaceId.toString()) {
                    return {
                      ...workspace,
                      activatedBoards: workspace.activatedBoards.map(
                        (board) => {
                          if (board.id !== boardId.toString()) {
                            return board;
                          }
                          return {
                            ...board,
                            ...data,
                          };
                        }
                      ),
                    };
                  } else {
                    return workspace;
                  }
                }
              ) ?? [],
          },
        },
      },
    })
    .where(eq(subscriptions.id, subscriptionId));
};
