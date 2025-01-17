import { monday } from './monday-sdk-instance';
import { getDevToken } from './get-dev-token';

export const getAccountId = async () => {
  const res = await monday.api('query { account { id } }', {
    token: getDevToken(),
  });
  return res.account_id;
};
