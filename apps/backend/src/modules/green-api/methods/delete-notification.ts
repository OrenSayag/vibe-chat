import { GreenApiInstanceInfo } from '@monday-whatsapp/shared-types';
import { getClient } from './get-client';

type Input = GreenApiInstanceInfo & {
  receiptId: number;
};

export const deleteNotification = async (input: Input) => {
  const restAPI = getClient(input);
  const deleteNotificationRes: { result: boolean } =
    await restAPI.webhookService.deleteNotification(input.receiptId);
};
