import { getUserDefaultSubscription } from '@monday-whatsapp/db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async getUserDefaultSubscriptionId(userId: string) {
    return getUserDefaultSubscription({ userId });
  }
}
