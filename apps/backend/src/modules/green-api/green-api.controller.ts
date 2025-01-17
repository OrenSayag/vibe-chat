import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import {
  BackendBaseResponse,
  EventType,
  GetQrCodeResponse,
  GreenApiNotification,
  LogoutResponse,
} from '@monday-whatsapp/shared-types';
import { GreenApiService } from './green-api.service';
import { GreenApiWebhook } from '../../decorators/green-api-webhook.decorator';
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
  @GreenApiWebhook()
  @Post('webhook')
  async webhook(
    @Body() input: GreenApiNotification
  ): Promise<BackendBaseResponse<undefined>> {
    if (input.typeWebhook === 'stateInstanceChanged') {
      console.log(
        `stateInstanceChanged for instance ${input.instanceData.idInstance}. New state: ${input.stateInstance}`
      );
      this.eventsService.broadcastMessageByGreenInstanceId({
        instanceId: input.instanceData.idInstance,
        message: {
          type: EventType.INSTANCE_STATE_CHANGED,
          state: input.stateInstance,
        },
      });
    }
    return {
      success: true,
      message: 'Received webhook',
      data: undefined,
    };
  }
}
