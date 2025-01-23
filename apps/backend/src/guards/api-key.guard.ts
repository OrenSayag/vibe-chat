import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { WHATSAPP_WEBHOOK } from '../decorators/whatsapp-webhook.decorator';

const apiKeyHeaderName = 'x-api-key';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector
  ) {}

  private isKeyValid(key: string) {
    const validApiKey = this.configService.get('BACKEND_API_KEY');
    return validApiKey && key === validApiKey;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const isWhatsappWebhook = this.reflector.get<boolean>(
      WHATSAPP_WEBHOOK,
      context.getHandler()
    );
    if (isWhatsappWebhook) {
      const token = this.configService.get('WEBHOOK_URL_TOKEN');

      return true;
    }
    const key =
      req.headers[apiKeyHeaderName] ??
      req.headers[apiKeyHeaderName.toLowerCase()];
    return this.isKeyValid(key);
  }
}
