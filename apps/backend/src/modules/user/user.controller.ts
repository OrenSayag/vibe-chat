import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUserDefaultSubscriptionResponse } from '@vibe-chat/shared-types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId/default-subscription')
  async getUserDefaultSubscriptionId(
    @Param('userId') userId: string
  ): Promise<GetUserDefaultSubscriptionResponse> {
    const res = await this.userService.getUserDefaultSubscriptionId(userId);
    return {
      success: true,
      message: 'User default subscription id fetched successfully',
      data: {
        defaultSubscriptionId: res ?? undefined,
      },
    };
  }
}
