import { UpdateWorkspaceInfoRequest } from '@vibe-chat/shared-types';
import { getSubscription } from '@vibe-chat/db';
import { db } from '../../config';
import { subscriptions } from '../../schema';

type Input = {
  workspaceId: number;
  subscriptionId: string;
  data: UpdateWorkspaceInfoRequest;
};

export const updateWorkspaceInfo = async ({
  workspaceId,
  subscriptionId,
  data,
}: Input) => {
  const subscription = await getSubscription({
    type: 'subscriptionId',
    id: subscriptionId,
  });
  if (!subscription) {
    throw new Error('Subscription not found');
  }
  await db.update(subscriptions).set({
    info: {
      ...subscription.info,
      integrations: {
        ...subscription.info.integrations,
        monday: {
          ...subscription.info.integrations.monday!,
          activatedWorkspaces:
            subscription.info.integrations.monday?.activatedWorkspaces.map(
              (w) => {
                if (w.id !== workspaceId.toString()) {
                  return w;
                }
                const newActivatedBoards = data.activatedBoards.map((b) => {
                  const exists = w.activatedBoards.find((ab) => ab.id == b);
                  if (exists) {
                    return exists;
                  }
                  return {
                    id: b,
                    activationTime: new Date().toISOString(),
                  };
                });
                return {
                  ...w,
                  activatedBoards: newActivatedBoards,
                };
              }
            ) ?? [],
        },
      },
    },
  });
};
