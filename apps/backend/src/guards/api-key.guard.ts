import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const apiKeyHeaderName = 'x-api-key';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  private isKeyValid(key: string) {
    const validApiKey = this.configService.get('BACKEND_API_KEY');
    return validApiKey && key === validApiKey;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key =
      req.headers[apiKeyHeaderName] ??
      req.headers[apiKeyHeaderName.toLowerCase()];
    return this.isKeyValid(key);
  }
}
