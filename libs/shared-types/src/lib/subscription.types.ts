import { z } from 'zod';
import { BackendBaseResponse } from './app.types';

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

export enum WhatsappCloudStatus {
  SIGNED = 'signed',
  NOT_SIGNED = 'not-signed',
}

export const whatsappCloudInfo = z.union([
  z.object({
    status: z.literal(WhatsappCloudStatus.SIGNED),
    whatsappNumberId: z.string(),
    whatsappNumber: z.string(),
  }),
  z.object({
    status: z.literal(WhatsappCloudStatus.NOT_SIGNED),
  }),
]);

const subscriptionInfoSchema = z.object({
  accountId: z.string(),
  activatedWorkspaces: z.array(activatedWorkspaceSchema),
  whatsappCloudInfo: whatsappCloudInfo,
});

export type SubscriptionInfo = z.infer<typeof subscriptionInfoSchema>;

export type GetSubscriptionInfoResponse = BackendBaseResponse<{
  info: SubscriptionInfo;
  id: number;
}>;

export const updateSubscriptionInfoRequest = z.object({
  activatedWorkspaces: z.array(z.string()),
});

export type UpdateSubscriptionInfoRequest = z.infer<
  typeof updateSubscriptionInfoRequest
>;
