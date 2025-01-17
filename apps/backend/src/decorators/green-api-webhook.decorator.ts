export const GREEN_API_WEBHOOK = 'green_api_webhook';

import { SetMetadata } from '@nestjs/common';
export const GreenApiWebhook = () => SetMetadata(GREEN_API_WEBHOOK, true);
