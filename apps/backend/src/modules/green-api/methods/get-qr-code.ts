import { GreenApiInstanceInfo } from '@monday-whatsapp/shared-types';
import { getClient } from './get-client';

type Input = GreenApiInstanceInfo;
type Output = { qr: string };

const successfulType = 'qrCode';

export const getQrCode = async (input: Input): Promise<Output> => {
  const restAPI = getClient(input);
  const qrRes: { message: string; type: string } = await restAPI.instance.qr();
  if (qrRes.type !== successfulType) {
    throw new Error('Failed to get qr codes');
  }
  return {
    qr: qrRes.message,
  };
};
