export const WHATSAPP_WEBHOOK = 'WHATSAPP_WEBHOOK';

import { SetMetadata } from '@nestjs/common';
export const WhatsappWebhook = () => SetMetadata(WHATSAPP_WEBHOOK, true);
