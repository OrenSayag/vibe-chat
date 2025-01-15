import { GreenApiInstanceInfo } from '@monday-whatsapp/shared-types';
import { getClient } from './get-client';

type Input = GreenApiInstanceInfo;

export const logout = async (input: Input) => {
  const restAPI = getClient(input);
  const logoutRes: { isLogout: boolean } = await restAPI.instance.logout();
  if (!logoutRes.isLogout) {
    throw new Error('Logout failed');
  }
};
