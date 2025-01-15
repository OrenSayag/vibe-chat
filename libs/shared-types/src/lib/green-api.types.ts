import { BackendBaseResponse } from './app.types';

export enum GreenApiInstanceStatus {
  CONNECTED = 'connected',
  NOT_CONNECTED = 'not-connected',
  BLOCKED = 'blocked',
  SLEEP_MODE = 'blocked',
  STARTING = 'starting',
  MISSING_GREEN_API_INSTANCE_INFO = 'missing-green-api-instance-info',
  INVALID_GREEN_API_INSTANCE_INFO = 'invalid-green-api-instance-info',
}

export type GreenApiInstanceInfo = {
  instanceId: string;
  token: string;
};

export const mondayStorageGreenApiTokenKey = (instanceId: string) =>
  `green-api-token-${instanceId}`;

export type GreenApiInstanceState = {
  wid: string;
  status:
    | 'authorized'
    | 'notAuthorized'
    | 'sleepMode'
    | 'starting'
    | 'blocked'
    | 'yellowCard';
};

export const instanceStateAppStatusMap: Record<
  GreenApiInstanceState['status'],
  GreenApiInstanceStatus
> = {
  authorized: GreenApiInstanceStatus.CONNECTED,
  blocked: GreenApiInstanceStatus.BLOCKED,
  notAuthorized: GreenApiInstanceStatus.NOT_CONNECTED,
  sleepMode: GreenApiInstanceStatus.SLEEP_MODE,
  starting: GreenApiInstanceStatus.STARTING,
  yellowCard: GreenApiInstanceStatus.CONNECTED,
};

export type LogoutResponse = BackendBaseResponse<undefined>;

export type GetQrCodeResponse = BackendBaseResponse<{ qr: string }>;

export type GreenApiNotification = {
  receiptId: number;
  body: {
    typeWebhook: 'stateInstanceChanged' | string;
    stateInstance: 'notAuthorized' | 'authorized' | string;
  };
};
export type GetNotificationResponse = BackendBaseResponse<
  GreenApiNotification | undefined
>;
