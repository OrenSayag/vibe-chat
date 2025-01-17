import { Injectable } from '@nestjs/common';
import { getInstanceDetails } from './methods/get-instance-details';
import { getQrCode as _getQrCode } from './methods/get-qr-code';
import { logout as _logout } from './methods/logout';
import { getSubscription } from '../subscription/methods/get-subscription';

@Injectable()
export class GreenApiService {
  getInstanceDetails(input: Parameters<typeof getInstanceDetails>[0]) {
    return getInstanceDetails(input);
  }
  async getQrCode({ subscriptionId }: { subscriptionId: number }) {
    const subscription = await getSubscription({
      id: subscriptionId,
      type: 'subscriptionId',
    });
    if (!subscription.greenApiInstanceInfo) {
      throw new Error('Invalid account configuration');
    }
    return await _getQrCode(subscription.greenApiInstanceInfo);
  }
  async logout({ subscriptionId }: { subscriptionId: number }) {
    const subscription = await getSubscription({
      id: subscriptionId,
      type: 'subscriptionId',
    });
    if (!subscription.greenApiInstanceInfo) {
      throw new Error('Invalid account configuration');
    }
    await _logout(subscription.greenApiInstanceInfo);
  }
}
