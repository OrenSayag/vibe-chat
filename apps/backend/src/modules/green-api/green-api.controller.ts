import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  BackendBaseResponse,
  GetQrCodeResponse,
  GreenApiNotification,
  LogoutResponse,
} from '@monday-whatsapp/shared-types';
import { GreenApiService } from './green-api.service';
import { WhatsappWebhook } from '../../decorators/whatsapp-webhook.decorator';
import { EventsService } from '../events/events.service';

@Controller('green-api')
export class GreenApiController {
  constructor(
    private readonly greenApiService: GreenApiService,
    private readonly eventsService: EventsService
  ) {}
  @Get(':subscriptionId/logout')
  async logout(
    @Param('subscriptionId') subscriptionId: string
  ): Promise<LogoutResponse> {
    if (Number.isNaN(Number(subscriptionId))) {
      throw new NotFoundException();
    }
    await this.greenApiService.logout({
      subscriptionId: Number(subscriptionId),
    });
    return {
      success: true,
      message: 'Logged out',
      data: undefined,
    };
  }
  @Get(':subscriptionId/qr')
  async getQrCode(
    @Param('subscriptionId') subscriptionId: string
  ): Promise<GetQrCodeResponse> {
    if (Number.isNaN(Number(subscriptionId))) {
      throw new NotFoundException();
    }
    const { qr } = await this.greenApiService.getQrCode({
      subscriptionId: Number(subscriptionId),
    });
    return {
      success: true,
      message: 'Got QR',
      data: {
        qr,
      },
    };
  }
  @WhatsappWebhook()
  @Post('webhook')
  async webhook(
    @Body() input: GreenApiNotification
  ): Promise<BackendBaseResponse<undefined>> {
    console.log('Received webhook');
    console.log({
      input: JSON.stringify(input),
    });
    return {
      success: true,
      message: 'Received webhook',
      data: undefined,
    };
  }
  @WhatsappWebhook()
  @Get('webhook')
  async webhookVerify(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string
  ): Promise<string> {
    return challenge;
  }
}
