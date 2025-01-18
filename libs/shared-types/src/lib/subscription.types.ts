import { z } from 'zod';
import { BackendBaseResponse } from './app.types';
import {
  GreenApiInstanceInfo,
  GreenApiInstanceStatus,
} from './green-api.types';

const baseActivatedItemScheme = z.object({
  activationTime: z.string().datetime(),
  id: z.string(),
});

export type BaseActivatedItemSchema = z.infer<typeof baseActivatedItemScheme>;

const activatedBoardSchema = baseActivatedItemScheme.extend({
  defaultPhoneColumnId: z.string().optional(),
});

const activatedWorkspaceSchema = baseActivatedItemScheme.extend({
  activatedBoards: z.array(activatedBoardSchema),
});

export type ActivatedWorkspace = z.infer<typeof activatedWorkspaceSchema>;

const subscriptionInfoSchema = z.object({
  accountId: z.string(),
  activatedWorkspaces: z.array(activatedWorkspaceSchema),
});

export type SubscriptionInfo = z.infer<typeof subscriptionInfoSchema>;

export type GetSubscriptionInfoResponse = BackendBaseResponse<{
  info: SubscriptionInfo;
  id: number;
  greenApiInstanceInfo?: Omit<GreenApiInstanceInfo, 'token'> & {
    status: GreenApiInstanceStatus;
    wid?: string;
  };
}>;

export const updateSubscriptionInfoRequest = z.object({
  activatedWorkspaces: z.array(z.string()),
});

export type UpdateSubscriptionInfoRequest = z.infer<
  typeof updateSubscriptionInfoRequest
>;
