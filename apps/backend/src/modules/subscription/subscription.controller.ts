import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import {
  BackendBaseResponse,
  SubscriptionInfo,
  updateSubscriptionInfoRequest,
} from '@monday-whatsapp/shared-types';
import { SubscriptionService } from './subscription.service';
import { createZodDto } from 'nestjs-zod';

class UpdateSubscriptionRequestDto extends createZodDto(
  updateSubscriptionInfoRequest
) {}

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}
  @Get(':accountId')
  public async getSubscription(@Param('accountId') accountId: string): Promise<
    BackendBaseResponse<
      SubscriptionInfo & {
        id: number;
      }
    >
  > {
    const info = await this.subscriptionService.getSubscription({
      accountId,
      type: 'accountId',
    });
    const data = { ...info.subscriptionInfo, id: info.id };
    return {
      success: true,
      message: 'Successfully retrieved subscription info',
      data,
    };
  }
  @Post(':accountId')
  public async createSubscription(
    @Param('accountId') accountId: string
  ): Promise<BackendBaseResponse<undefined>> {
    await this.subscriptionService.createSubscription({
      accountId,
    });
    return {
      success: true,
      message: 'Successfully created subscription',
      data: undefined,
    };
  }
  @Patch(':subscriptionId')
  public async updateSubscription(
    @Param('subscriptionId') subscriptionId: string,
    @Body() input: UpdateSubscriptionRequestDto
  ): Promise<BackendBaseResponse<undefined>> {
    await this.subscriptionService.updateSubscription({
      info: input,
      subscriptionId: Number(subscriptionId),
    });
    return {
      success: true,
      message: 'Successfully updated subscription',
      data: undefined,
    };
  }
}
