import { Injectable } from '@nestjs/common';
import { getInstanceDetails } from './methods/get-instance-details';
import { getQrCode as _getQrCode } from './methods/get-qr-code';
import { logout as _logout } from './methods/logout';
import { receiveNotification as _receiveNotification } from './methods/receive-notification';
import { getSubscription } from '../subscription/methods/get-subscription';
import { deleteNotification } from './methods/delete-notification';
import { GreenApiNotification } from '@monday-whatsapp/shared-types';

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
  async receiveNotification({ subscriptionId }: { subscriptionId: number }) {
    const subscription = await getSubscription({
      id: subscriptionId,
      type: 'subscriptionId',
    });
    if (!subscription.greenApiInstanceInfo) {
      throw new Error('Invalid account configuration');
    }
    const notification = await _receiveNotification(
      subscription.greenApiInstanceInfo
    );

    if ((notification as GreenApiNotification)?.receiptId) {
      await deleteNotification({
        ...subscription.greenApiInstanceInfo,
        receiptId: (notification as GreenApiNotification).receiptId,
      });
    }

    return notification;
  }
}
