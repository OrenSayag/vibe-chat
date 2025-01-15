import {
  GreenApiInstanceInfo,
  GreenApiNotification,
} from '@monday-whatsapp/shared-types';
import { getClient } from './get-client';

type Input = GreenApiInstanceInfo;

type Output = GreenApiNotification | undefined;

export const receiveNotification = async (input: Input): Promise<Output> => {
  const restAPI = getClient(input);
  const notification: GreenApiNotification =
    await restAPI.webhookService.receiveNotification();
  return notification;
};
