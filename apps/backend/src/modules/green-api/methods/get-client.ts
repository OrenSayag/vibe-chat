import { GreenApiInstanceInfo } from '@monday-whatsapp/shared-types';
import greenApiClient from '@green-api/whatsapp-api-client';

type Input = GreenApiInstanceInfo;

export const getClient = ({ instanceId, token }: Input) =>
  greenApiClient.restAPI({
    idInstance: instanceId,
    apiTokenInstance: token,
  });
