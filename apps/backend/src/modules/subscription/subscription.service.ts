import { Injectable } from '@nestjs/common';
import { getSubscription as _getSubscription } from './methods/get-subscription';
import { createSubscription as _createSubscription } from './methods/create-subscription';
import { updateSubscription as _updateSubscription } from './methods/update-subscription';
import { GreenApiService } from '../green-api/green-api.service';
import { GetSubscriptionInfoResponse } from '@monday-whatsapp/shared-types';

@Injectable()
export class SubscriptionService {
  constructor(private readonly greenApiService: GreenApiService) {}
  async getSubscription(
    input: Parameters<typeof _getSubscription>[0]
  ): Promise<GetSubscriptionInfoResponse['data']> {
    const data = await _getSubscription(input);
    let greenApiInstanceInfo: GetSubscriptionInfoResponse['data']['greenApiInstanceInfo'];
    if (data.greenApiInstanceInfo?.instanceId) {
      const instance = await this.greenApiService.getInstanceDetails({
        instanceInfo: data.greenApiInstanceInfo,
      });
      greenApiInstanceInfo = {
        instanceId: data.greenApiInstanceInfo.instanceId,
        ...instance,
      };
      if ((greenApiInstanceInfo as any)?.token) {
        delete (greenApiInstanceInfo as any).token;
      }
    }
    return { id: data.id, info: data.info, greenApiInstanceInfo };
  }
  createSubscription(input: Parameters<typeof _createSubscription>[0]) {
    return _createSubscription(input);
  }
  updateSubscription(input: Parameters<typeof _updateSubscription>[0]) {
    return _updateSubscription(input);
  }
}
