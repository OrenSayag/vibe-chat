import { z } from 'zod';

const activatedWorkspaceSchema = z.object({
  id: z.string(),
  activationTime: z.string().datetime(),
});

export type ActivatedWorkspace = z.infer<typeof activatedWorkspaceSchema>;

const subscriptionInfoSchema = z.object({
  accountId: z.string(),
  activatedWorkspaces: z.array(activatedWorkspaceSchema),
});

export type SubscriptionInfo = z.infer<typeof subscriptionInfoSchema>;

export const updateSubscriptionInfoRequest = z.object({
  activatedWorkspaces: z.array(z.string()),
});

export type UpdateSubscriptionInfoRequest = z.infer<
  typeof updateSubscriptionInfoRequest
>;
