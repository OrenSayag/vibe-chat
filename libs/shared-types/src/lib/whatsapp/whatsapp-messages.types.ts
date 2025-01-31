import { z } from 'zod';
import { WhatsappMessageType } from '@monday-whatsapp/shared-types';

export const messageType = z.union([
  z.literal(WhatsappMessageType.TEXT),
  z.literal(WhatsappMessageType.DOCUMENT),
]);

export const templateMessageSchema = z.object({
  type: z.literal(WhatsappMessageType.TEMPLATE),
  template: z.object({
    name: z.string(),
    language: z.object({
      code: z.string(),
    }),
  }),
});

export type WhatsappTemplateMessage = z.infer<typeof templateMessageSchema>;

export const textMessageSchema = z.object({
  type: z.literal(WhatsappMessageType.TEXT),
  text: z.object({
    body: z.string(),
  }),
});

export type WhatsappTextMessage = z.infer<typeof textMessageSchema>;

export const whatsappMessageSchema = z.union([
  textMessageSchema,
  templateMessageSchema,
]);

export type WhatsappMessage = z.infer<typeof whatsappMessageSchema>;

export const sendMessageSchema = z
  .object({
    to: z.string(),
  })
  .and(whatsappMessageSchema);

export type SendMessageRequest = z.infer<typeof sendMessageSchema>;
