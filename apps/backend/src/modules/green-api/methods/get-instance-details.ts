import {
  GreenApiInstanceInfo,
  GreenApiInstanceState,
  GreenApiInstanceStatus,
  instanceStateAppStatusMap,
} from '@monday-whatsapp/shared-types';
import greenApiClient from '@green-api/whatsapp-api-client';

type Input = {
  instanceInfo: GreenApiInstanceInfo;
};

type Output = {
  status: GreenApiInstanceStatus;
  wid?: string;
};

export const getInstanceDetails = async ({
  instanceInfo,
}: Input): Promise<Output> => {
  const restAPI = greenApiClient.restAPI({
    idInstance: instanceInfo.instanceId,
    apiTokenInstance: instanceInfo.token,
  });
  const stateRes: { stateInstance: GreenApiInstanceState['status'] } =
    await restAPI.instance.getStateInstance();
  const settingsRes: { wid: string } = await restAPI.settings.getSettings();
  return {
    status: instanceStateAppStatusMap[stateRes.stateInstance],
    wid: settingsRes.wid,
  };
};
