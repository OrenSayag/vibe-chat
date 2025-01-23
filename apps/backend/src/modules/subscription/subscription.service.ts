import { Injectable } from '@nestjs/common';
import { getSubscription as _getSubscription } from './methods/get-subscription';
import { createSubscription as _createSubscription } from './methods/create-subscription';
import { updateSubscription as _updateSubscription } from './methods/update-subscription';
import { GetSubscriptionInfoResponse } from '@monday-whatsapp/shared-types';

@Injectable()
export class SubscriptionService {
  async getSubscription(
    input: Parameters<typeof _getSubscription>[0]
  ): Promise<GetSubscriptionInfoResponse['data']> {
    const data = await _getSubscription(input);
    return { id: data.id, info: data.info };
  }
  createSubscription(input: Parameters<typeof _createSubscription>[0]) {
    return _createSubscription(input);
  }
  updateSubscription(input: Parameters<typeof _updateSubscription>[0]) {
    return _updateSubscription(input);
  }
}
