import { z } from 'zod';
import { BackendBaseResponse } from './app.types';
import { IntegrationType } from '../dashboard/integrations.types';

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
    whatsappBusinessAccountId: z.string(),
    displayName: z.string(),
    profilePictureUrl: z.string().optional(),
  }),
  z.object({
    status: z.literal(WhatsappCloudStatus.NOT_SIGNED),
  }),
]);

export type WhatsappCloudInfo = z.infer<typeof whatsappCloudInfo>;

export const organizationInfoSchema = z.object({
  displayName: z.string(),
  image: z.number().optional(),
});

export type OrganizationInfoSchema = z.infer<typeof organizationInfoSchema>;

const subscriptionIntegrationsSchema = z
  .object({
    monday: z.object({
      accountId: z.string(),
      activatedWorkspaces: z.array(activatedWorkspaceSchema),
    }),
    whatsappCloudInfo,
  })
  .partial();

const subscriptionInfoSchema = z.object({
  organizationInfo: organizationInfoSchema,
  integrations: subscriptionIntegrationsSchema,
});

export type SubscriptionInfo = z.infer<typeof subscriptionInfoSchema>;

export type GetSubscriptionInfoResponse = BackendBaseResponse<{
  info: SubscriptionInfo;
  id: string;
  connectedIntegrations: IntegrationType[];
}>;

export const updateSubscriptionInfoRequest = z.object({
  activatedWorkspaces: z.array(z.string()),
});

export type UpdateSubscriptionInfoRequest = z.infer<
  typeof updateSubscriptionInfoRequest
>;

export const createSubscriptionRequestSchema = organizationInfoSchema;

export type CreateSubscriptionInfoRequest = z.infer<
  typeof createSubscriptionRequestSchema
>;

export type CreateSubscriptionInfoResponse = BackendBaseResponse<{
  id: string;
}>;
