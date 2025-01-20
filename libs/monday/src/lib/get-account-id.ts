import { monday } from './monday-sdk-instance';

export const getAccountId = async () => {
  const res = await monday.api('query { account { id } }');
  return res.account_id;
};
