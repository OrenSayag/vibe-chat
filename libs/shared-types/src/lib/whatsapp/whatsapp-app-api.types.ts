import {
  BackendBaseResponse,
  WhatsappTemplate,
  WhatsappTemplateCategory,
  whatsappTemplateComponentSchema,
  WhatsappTemplateStatus,
} from '@vibe-chat/shared-types';
import { z } from 'zod';

export type GetTemplatesResponse = BackendBaseResponse<WhatsappTemplate[]>;
export type GetTemplateDraftResponse =
  BackendBaseResponse<WhatsappTemplate | null>;
export type GetTemplateDraftsResponse = BackendBaseResponse<WhatsappTemplate[]>;
export type SaveTemplateDraftResponse = BackendBaseResponse<{
  id: number;
}>;

export const saveTemplateDraftSchema = z.object({
  template: z.object({
    id: z.number().optional(),
    name: z.string(),
    language: z.string(),
    category: z.nativeEnum(WhatsappTemplateCategory),
    components: z.array(whatsappTemplateComponentSchema),
  }),
});

export type SaveTemplateDraftRequest = z.infer<typeof saveTemplateDraftSchema>;

export type GetTemplateResponse = BackendBaseResponse<WhatsappTemplate>;

export type SaveTemplateResponse = BackendBaseResponse<{
  id: string;
  name: string;
  status: WhatsappTemplateStatus;
}>;

export const saveTemplateSchema = z.object({
  template: z.object({
    name: z.string(),
    language: z.string(),
    category: z.nativeEnum(WhatsappTemplateCategory),
    components: z.array(whatsappTemplateComponentSchema),
  }),
  subscriptionId: z.string(),
});

export type SaveTemplateRequest = z.infer<typeof saveTemplateSchema>;
