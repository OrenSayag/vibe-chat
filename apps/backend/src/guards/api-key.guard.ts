import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { GREEN_API_WEBHOOK } from '../decorators/green-api-webhook.decorator';

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
    const isGreenApiWebhook = this.reflector.get<boolean>(
      GREEN_API_WEBHOOK,
      context.getHandler()
    );
    const greenApiWebhookToken = this.configService.get('WEBHOOK_URL_TOKEN');
    if (isGreenApiWebhook && greenApiWebhookToken) {
      return req.headers['authorization'] === `Bearer ${greenApiWebhookToken}`;
    }
    const key =
      req.headers[apiKeyHeaderName] ??
      req.headers[apiKeyHeaderName.toLowerCase()];
    return this.isKeyValid(key);
  }
}
