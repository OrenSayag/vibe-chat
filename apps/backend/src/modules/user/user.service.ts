import { getUserDefaultSubscription } from '@vibe-chat/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUserDefaultSubscriptionId(userId: string) {
    return getUserDefaultSubscription({ userId });
  }
}
