import { z } from 'zod';

export type ListItem<T = string> = {
  label: string;
  value: T;
};

export type DeactivatedItem = ListItem<{
  id: string;
}>;

export type ActivatedItem = ListItem<{
  activationDate: string;
  id: string;
}>;

export type BackendBaseResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export const baseGetListParams = z.object({
  offset: z
    .string()
    .transform((s) => Number(s))
    .refine((v) => v >= 0),
  limit: z
    .string()
    .transform((s) => Number(s))
    .refine((v) => v <= 200 && v >= 0),
});

export type BaseGetListParams = z.infer<typeof baseGetListParams>;
