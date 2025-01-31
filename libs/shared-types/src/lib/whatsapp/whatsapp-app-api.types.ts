import {
  BackendBaseResponse,
  WhatsappTemplate,
} from '@monday-whatsapp/shared-types';

export type GetTemplatesResponse = BackendBaseResponse<WhatsappTemplate[]>;
