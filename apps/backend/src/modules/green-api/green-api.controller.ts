import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import {
  GetNotificationResponse,
  GetQrCodeResponse,
  LogoutResponse,
} from '@monday-whatsapp/shared-types';
import { GreenApiService } from './green-api.service';

@Controller('green-api')
export class GreenApiController {
  constructor(private readonly greenApiService: GreenApiService) {}
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
  @Get(':subscriptionId/notification')
  async getNotification(
    @Param('subscriptionId') subscriptionId: string
  ): Promise<GetNotificationResponse> {
    if (Number.isNaN(Number(subscriptionId))) {
      throw new NotFoundException();
    }
    const notification = await this.greenApiService.receiveNotification({
      subscriptionId: Number(subscriptionId),
    });
    return {
      success: true,
      message: 'Received Notification',
      data: notification,
    };
  }
}
